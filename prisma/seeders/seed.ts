import { PrismaClient } from '@prisma/client';
import { usersSeeder } from './users-seeder';
import { siteSectionsSeeder } from './site-sections-seeder';
import { settingsSeeder } from './settings-seeder';
/**
 * Main seeder function that orchestrates all seed operations
 * @throws Error if any seeding operation fails
 */
async function main() {
  const prisma = new PrismaClient();

  try {
    console.log('🚀 Starting database seeding...');

    // Run seeders in sequence
    // First seed users
    await usersSeeder(prisma);
    
    // Then seed site sections
    await siteSectionsSeeder(prisma);
    
    // Finally seed settings which depend on site sections
    await settingsSeeder(prisma);

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
