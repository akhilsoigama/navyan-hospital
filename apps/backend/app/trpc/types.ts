/**
 * Type-only re-export of the AppRouter type for frontend consumption.
 *
 * This file intentionally has NO runtime imports — it only re-exports
 * the type so the web app can import it without bundling backend code.
 *
 * Usage in web:
 *   import type { AppRouter } from '../../../backend/app/trpc/types'
 */
export type { AppRouter } from './router.js'
