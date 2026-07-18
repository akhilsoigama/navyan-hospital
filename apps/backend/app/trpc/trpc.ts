import { initTRPC, TRPCError } from '@trpc/server'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * Context passed into every tRPC procedure.
 * Derived from Adonis's HttpContext so we get
 * access to auth, request, response, containerResolver, etc.
 */
export function createContext({ ctx }: { ctx: HttpContext }) {
  return {
    auth: ctx.auth,
    request: ctx.request,
    response: ctx.response,
    containerResolver: ctx.containerResolver,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>

const t = initTRPC.context<Context>().create()

export const router = t.router
export const publicProcedure = t.procedure

/**
 * protectedProcedure — requires an authenticated user
 */
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  const user = await ctx.auth.authenticate()

  if (!user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      ...ctx,
      user,
    },
  })
})