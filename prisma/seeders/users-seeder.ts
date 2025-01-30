import { PrismaClient, UserRole } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

interface UserSeed {
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
  dateOfBirth?: Date;
}

/**
 * Seeds initial user data into the database
 * @param prisma PrismaClient instance
 * @throws Error if seeding fails
 */
export async function seedUsers(prisma: PrismaClient): Promise<void> {
  const users: UserSeed[] = [
    {
      email: 'admin@test.com',
      password: '123456789',
      fullName: 'System Administrator',
      role: UserRole.admin,
      dateOfBirth: new Date('1990-01-01'),
    },
    {
      email: 'user@test.com',
      password: '123456789',
      fullName: 'Regular User',
      role: UserRole.user,
      dateOfBirth: new Date('1995-05-15'),
    },
    {
        email: 'user1@test.com',
        password: '123456789',
        fullName: 'Regular User',
        role: UserRole.user,
        dateOfBirth: new Date('1995-05-15'),
      },
      {
        email: 'user2@test.com',
        password: '123456789',
        fullName: 'Regular User',
        role: UserRole.user,
        dateOfBirth: new Date('1995-05-15'),
      },
  ];

  try {
    console.log('🌱 Seeding users...');
    
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
      
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          email: user.email,
          password: hashedPassword,
          fullName: user.fullName,
          role: user.role,
          dateOfBirth: user.dateOfBirth,
        },
      });
    }

    console.log('✅ Users seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
}
