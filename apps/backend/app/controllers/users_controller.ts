// app/controllers/users_controller.ts

import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import vine from '@vinejs/vine'

import User from '#models/user'

/* =========================================================================
   Validators
   ========================================================================= */

const listValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    perPage: vine.number().min(1).max(100).optional(),
    search: vine.string().trim().optional(),
  })
)

const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100),
    email: vine.string().trim().email(),
    mobile: vine.string().trim().minLength(10).maxLength(15).optional(),
    password: vine.string().minLength(6).maxLength(180),
  })
)

const updateProfileValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(2).maxLength(100).optional(),
    mobile: vine.string().trim().minLength(10).maxLength(15).optional(),
  })
)

const changePasswordValidator = vine.compile(
  vine.object({
    currentPassword: vine.string().minLength(6),
    newPassword: vine.string().minLength(6).maxLength(180),
  })
)

const setActiveValidator = vine.compile(
  vine.object({
    isActive: vine.boolean(),
  })
)

/* =========================================================================
   Controller
   ========================================================================= */

export default class UsersController {
  async index({ request, response }: HttpContext) {
    const rawQuery = request.qs()
    const input = await listValidator.validate({
      page: rawQuery.page ? Number(rawQuery.page) : undefined,
      perPage: rawQuery.perPage ? Number(rawQuery.perPage) : undefined,
      search: rawQuery.search,
    })

    const page = input.page ?? 1
    const perPage = input.perPage ?? 20

    const query = User.query()

    if (input.search) {
      query.where((b) => {
        b.whereILike('full_name', `%${input.search}%`)
          .orWhereILike('email', `%${input.search}%`)
          .orWhereILike('mobile', `%${input.search}%`)
      })
    }

    const result = await query.orderBy('id', 'asc').paginate(page, perPage)

    return response.ok({
      meta: {
        total: result.total,
        perPage: result.perPage,
        currentPage: result.currentPage,
        lastPage: result.lastPage,
      },
      data: result.all(),
    })
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(createUserValidator)

    const existing = await User.findBy('email', data.email)
    if (existing) {
      return response.conflict({ message: 'A user with this email already exists' })
    }

    const user = await User.create({
      fullName: data.fullName,
      email: data.email,
      mobile: data.mobile ?? '',
      password: data.password,
      isActive: true,
    })

    return response.created(user)
  }

  async show({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ message: 'Invalid user id' })
    }

    const user = await User.find(id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    return response.ok(user)
  }

  async updateProfile({ params, request, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ message: 'Invalid user id' })
    }

    const data = await request.validateUsing(updateProfileValidator)

    const user = await User.find(id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    if (data.fullName !== undefined) user.fullName = data.fullName
    if (data.mobile !== undefined) user.mobile = data.mobile
    await user.save()

    return response.ok(user)
  }

  async changePassword({ params, request, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ message: 'Invalid user id' })
    }

    const { currentPassword, newPassword } = await request.validateUsing(changePasswordValidator)

    const user = await User.find(id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    const valid = await hash.verify(user.password, currentPassword)
    if (!valid) {
      return response.forbidden({ message: 'Current password is incorrect' })
    }

    user.password = newPassword
    await user.save()

    return response.ok({ success: true, message: 'Password updated successfully' })
  }

  async setActive({ params, request, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ message: 'Invalid user id' })
    }

    const { isActive } = await request.validateUsing(setActiveValidator)

    const user = await User.find(id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    user.isActive = isActive
    await user.save()

    return response.ok({
      success: true,
      message: isActive ? 'User activated successfully' : 'User deactivated successfully',
    })
  }

  async destroy({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!Number.isInteger(id) || id < 1) {
      return response.badRequest({ message: 'Invalid user id' })
    }

    const user = await User.find(id)
    if (!user) {
      return response.notFound({ message: 'User not found' })
    }

    user.isActive = false
    await user.save()

    return response.ok({ success: true, message: 'User deleted successfully' })
  }
}