// app/models/permission.ts
import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from './role.js'
import { PERMISSIONS, ROLES_PERMISSIONS } from '#database/constant/table_name'

export default class Permission extends BaseModel {
  public static table = PERMISSIONS

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare permissionName: string

  @column()
  declare permissionKey: string

  @manyToMany(() => Role, {
    pivotTable: ROLES_PERMISSIONS,
    pivotForeignKey: 'permission_id',
    pivotRelatedForeignKey: 'role_id',
  })
  declare roles: ManyToMany<typeof Role>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
