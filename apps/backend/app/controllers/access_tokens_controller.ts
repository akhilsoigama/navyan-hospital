// app/controllers/access_tokens_controller.ts
//
// Handles login (issue an access token) and logout (revoke it).
//
// IMPORTANT: We use `User.verifyCredentials(email, password)` — a static
// method added automatically by the `withAuthFinder` mixin on the User
// model. It looks up the user by the configured `uids` (email), then
// verifies the password using the SAME hasher the mixin was configured
// with (`hash.use('scrypt')`), regardless of what `config/hash.ts`
// declares as the global default. This avoids "Invalid user credentials"
// errors caused by a default-hasher mismatch when calling `hash.verify()`
// directly.

import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

import User from '#models/user'

/* =========================================================================
   Validators
   ========================================================================= */

const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().minLength(1),
  })
)

/* =========================================================================
   Controller
   ========================================================================= */

export default class AccessTokensController {
  /* ---------------------------------------------------------------------- */
  /* POST /api/v1/auth/login                                                  */
  /* ---------------------------------------------------------------------- */
  /**
   * Verify credentials and issue a new access token.
   *
   * Body (JSON): { email, password }
   */
  async store({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    // verifyCredentials throws E_INVALID_CREDENTIALS if the email
    // doesn't exist OR the password doesn't match — we catch it below
    // so we can return a clean, uniform error response.
    let user: User
    try {
      user = await User.verifyCredentials(email, password)
    } catch (error) {
      return response.unauthorized({
        errors: [{ message: 'Invalid user credentials' }],
      })
    }

    if (!user.isActive) {
      return response.forbidden({
        errors: [{ message: 'This account has been deactivated' }],
      })
    }

    const token = await User.accessTokens.create(user)

    return response.ok({
      type: 'bearer',
      value: token.value!.release(),
      expiresAt: token.expiresAt,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        userType: user.userType,
        isActive: user.isActive,
      },
    })
  }

  /* ---------------------------------------------------------------------- */
  /* POST /api/v1/account/logout                                             */
  /* ---------------------------------------------------------------------- */
  /**
   * Revoke the access token used to authenticate the current request.
   * Requires the `auth` middleware (so ctx.auth.user is populated).
   */
  async destroy({ auth, response }: HttpContext) {
    const user = auth.user! as User & { currentAccessToken?: { identifier: string } }
    const token = user.currentAccessToken

    if (token) {
      await User.accessTokens.delete(user, token.identifier)
    }

    return response.ok({ success: true, message: 'Logged out successfully' })
  }
}