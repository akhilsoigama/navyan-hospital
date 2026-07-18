// app/trpc/router.ts

import { router } from './trpc.ts'
import { userRouter } from './routers/user.router.ts'

export const appRouter = router({
  user: userRouter,
})

export type AppRouter = typeof appRouter