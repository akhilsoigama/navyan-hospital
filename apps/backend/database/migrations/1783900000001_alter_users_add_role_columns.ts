import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('mobile', 15).nullable()
      table.string('user_type', 50).nullable()
      table.boolean('is_active').defaultTo(true)
      table.integer('fleet_manager_id').unsigned().nullable()
      table.integer('driver_id').unsigned().nullable()
      table.integer('financial_analyst_id').unsigned().nullable()
      table.integer('safety_officer_id').unsigned().nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('mobile')
      table.dropColumn('user_type')
      table.dropColumn('is_active')
      table.dropColumn('fleet_manager_id')
      table.dropColumn('driver_id')
      table.dropColumn('financial_analyst_id')
      table.dropColumn('safety_officer_id')
    })
  }
}
