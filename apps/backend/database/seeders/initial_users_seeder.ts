// database/seeders/initial_users_seeder.ts
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class InitialUsersSeeder extends BaseSeeder {
  async run() {
    console.log('🌱 Seeding initial user...')

    const adminPwd = 'Admin@123'

    await User.updateOrCreate(
      { email: 'admin@transit.com' },
      {
        fullName: 'System Admin',
        email: 'admin@transit.com',
        mobile: '9800000000',
        password: adminPwd,
        isActive: true,
      }
    )

    console.log('  ✅ Admin  →  admin@transit.com  /  Admin@123')
    console.log('\n🎉 Seeding complete!')
  }
}