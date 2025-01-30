import { PrismaClient } from '@prisma/client';
import { seedUsers } from './users-seeder';

/**
 * Main seeder function that orchestrates all seed operations
 * @throws Error if any seeding operation fails
 */
async function main() {
  const prisma = new PrismaClient();

  try {
    console.log('🚀 Starting database seeding...');

    // Run seeders in sequence
    await seedUsers(prisma);

    console.log('✅ Database seeding completed successfully');
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Execute seeding
main()
  .catch((error) => {
    console.error('❌ Fatal error during seeding:', error);
    process.exit(1);
  });
