// app/trpc/routers/user.router.ts

import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { router, protectedProcedure } from '#trpc/trpc'
import hash from '@adonisjs/core/services/hash'

import User from '#models/user'

/* =========================================================================
   Zod Schemas
   ========================================================================= */

// ── Input schemas ──────────────────────────────────────────────────────────

const idSchema = z.object({
  id: z.number().int().positive(),
})

const listSchema = z.object({
  page: z.number().int().min(1).default(1),
  perPage: z.number().int().min(1).max(100).default(20),
  search: z.string().trim().optional(),
})

const createSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email(),
  mobile: z.string().trim().min(10).max(15).optional(),
  password: z.string().min(6).max(180),
})

const updateProfileSchema = z.object({
  id: z.number().int().positive(),
  fullName: z.string().trim().min(2).max(100).optional(),
  mobile: z.string().trim().min(10).max(15).optional(),
})

const changePasswordSchema = z.object({
  id: z.number().int().positive(),
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6).max(180),
})

const setActiveSchema = z.object({
  id: z.number().int().positive(),
  isActive: z.boolean(),
})

// ── Output schemas ──────────────────────────────────────────────────────────

const userBaseOutput = z.object({
  id: z.number(),
  fullName: z.string().nullable(),
  email: z.string(),
  mobile: z.string().nullable(),
  isActive: z.boolean(),
})

const listOutput = z.object({
  meta: z.object({
    total: z.number(),
    perPage: z.number(),
    currentPage: z.number(),
    lastPage: z.number(),
  }),
  data: z.array(userBaseOutput),
})

const successOutput = z.object({
  success: z.boolean(),
  message: z.string(),
})

/* =========================================================================
   Router
   ========================================================================= */

export const userRouter = router({
  /* ----------------------------------------------------------------------- */
  /* me — GET /trpc/user.me                                                   */
  /* ----------------------------------------------------------------------- */
  me: protectedProcedure.output(userBaseOutput).query(async ({ ctx }) => {
    const authUser = await ctx.auth.getUserOrFail()
    const user = await User.find(authUser.id)
    if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      mobile: user.mobile,
      isActive: user.isActive,
    }
  }),

  /* ----------------------------------------------------------------------- */
  /* list — GET /trpc/user.list                                               */
  /* ----------------------------------------------------------------------- */
  list: protectedProcedure
    .input(listSchema)
    .output(listOutput)
    .query(async ({ input }) => {
      const { page, perPage, search } = input

      const query = User.query()

      if (search) {
        query.where((b) => {
          b.whereILike('full_name', `%${search}%`)
            .orWhereILike('email', `%${search}%`)
            .orWhereILike('mobile', `%${search}%`)
        })
      }

      const result = await query.orderBy('id', 'asc').paginate(page, perPage)

      return {
        meta: {
          total: result.total,
          perPage: result.perPage,
          currentPage: result.currentPage,
          lastPage: result.lastPage,
        },
        data: result.all().map((u) => ({
          id: u.id,
          fullName: u.fullName,
          email: u.email,
          mobile: u.mobile,
          isActive: u.isActive,
        })),
      }
    }),

  /* ----------------------------------------------------------------------- */
  /* getById — GET /trpc/user.getById                                         */
  /* ----------------------------------------------------------------------- */
  getById: protectedProcedure
    .input(idSchema)
    .output(userBaseOutput)
    .query(async ({ input }) => {
      const user = await User.find(input.id)
      if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
      return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        isActive: user.isActive,
      }
    }),

  /* ----------------------------------------------------------------------- */
  /* create — mutation /trpc/user.create                                      */
  /* ----------------------------------------------------------------------- */
  create: protectedProcedure
    .input(createSchema)
    .output(userBaseOutput)
    .mutation(async ({ input }) => {
      const existing = await User.findBy('email', input.email)
      if (existing) {
        throw new TRPCError({ code: 'CONFLICT', message: 'A user with this email already exists' })
      }

      const user = await User.create({
        fullName: input.fullName,
        email: input.email,
        mobile: input.mobile ?? '',
        password: input.password,
        isActive: true,
      })

      return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        isActive: user.isActive,
      }
    }),

  /* ----------------------------------------------------------------------- */
  /* updateProfile — mutation /trpc/user.updateProfile                        */
  /* ----------------------------------------------------------------------- */
  updateProfile: protectedProcedure
    .input(updateProfileSchema)
    .output(userBaseOutput)
    .mutation(async ({ input }) => {
      const { id, ...data } = input

      const user = await User.find(id)
      if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })

      if (data.fullName !== undefined) user.fullName = data.fullName
      if (data.mobile !== undefined) user.mobile = data.mobile
      await user.save()

      return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        isActive: user.isActive,
      }
    }),

  /* ----------------------------------------------------------------------- */
  /* changePassword — mutation /trpc/user.changePassword                      */
  /* ----------------------------------------------------------------------- */
  changePassword: protectedProcedure
    .input(changePasswordSchema)
    .output(successOutput)
    .mutation(async ({ input }) => {
      const { id, currentPassword, newPassword } = input

      const user = await User.find(id)
      if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })

      const valid = await hash.verify(user.password, currentPassword)
      if (!valid) {
        throw new TRPCError({ code: 'FORBIDDEN', message: 'Current password is incorrect' })
      }

      user.password = newPassword
      await user.save()

      return { success: true, message: 'Password updated successfully' }
    }),

  /* ----------------------------------------------------------------------- */
  /* setActive — mutation /trpc/user.setActive                                */
  /* ----------------------------------------------------------------------- */
  setActive: protectedProcedure
    .input(setActiveSchema)
    .output(successOutput)
    .mutation(async ({ input }) => {
      const { id, isActive } = input

      const user = await User.find(id)
      if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })

      user.isActive = isActive
      await user.save()

      return {
        success: true,
        message: isActive ? 'User activated successfully' : 'User deactivated successfully',
      }
    }),

  /* ----------------------------------------------------------------------- */
  /* delete — mutation /trpc/user.delete                                      */
  /* ----------------------------------------------------------------------- */
  delete: protectedProcedure
    .input(idSchema)
    .output(successOutput)
    .mutation(async ({ input }) => {
      const user = await User.find(input.id)
      if (!user) throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })

      user.isActive = false
      await user.save()

      return { success: true, message: 'User deleted successfully' }
    }),
})
