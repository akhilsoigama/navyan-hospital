import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { ACCESS_TOKENS, USER_ROLES, USERS } from '#database/constant/table_name'
import { column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from './role.ts'
import env from '#start/env'


const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(UserSchema, AuthFinder) {
  public static table = USERS

  @column({ isPrimary: true })
  declare id: number


  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column()
  declare mobile: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare isActive: boolean


  @manyToMany(() => Role, {
    pivotTable: USER_ROLES,
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'role_id',
  })
  declare userRoles: ManyToMany<typeof Role>
  static accessTokens = DbAccessTokensProvider.forModel(User, {
    table: ACCESS_TOKENS,
    expiresIn: env.get('ACCESS_TOKEN_EXPIRES_IN'),
  })


  static async hasPermission(userId: number, permissionKey: string): Promise<boolean> {
    const user = await User.query()
      .where('id', userId)
      .preload('userRoles', (query) => {
        query.preload('permissions')
      })
      .first()

    if (!user) return false

    return user.userRoles.some(role =>
      role.permissions.some(permission => permission.permissionKey === permissionKey)
    )
  }
}
