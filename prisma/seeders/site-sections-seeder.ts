import { PrismaClient } from '@prisma/client';

interface SiteSectionSeed {
  title: string;
  description: string;
}

/**
 * Seeds initial user data into the database
 * @param prisma PrismaClient instance
 * @throws Error if seeding fails
 */
export async function siteSectionsSeeder(prisma: PrismaClient): Promise<void> {
    const sections: SiteSectionSeed[] = [
      {
        title: 'background',
        description: 'Background settings for the site',
      },
      {
        title: 'navbar',
        description: 'Navbar settings for the site',
      },
      {
        title: 'main_slider',
        description: 'Main slider settings for the site',
      },
      {
        title: 'who_we_are',
        description: 'Who we are settings for the site',
      },
      {
        title: 'our_core_values',
        description: 'Our core values settings for the site',
      },
      {
        title: 'our_projects',
        description: 'Our projects settings for the site',
      },
      {
        title: 'need_technical_support',
        description: 'Need technical support settings for the site',
      },
      {
        title: 'why_we_are_the_best',
        description: 'Why we are the best settings for the site',
      },
      {
        title: 'our_products',
        description: 'Our products settings for the site',
      },
      {
        title: 'our_geographical_coverage',
        description: 'Our geographical coverage settings for the site',
      },
      {
        title: 'frequently_asked_questions',
        description: 'Frequently asked questions settings for the site',
      },
      {
        title: 'our_brands',
        description: 'Our brands settings for the site',
      },
      {
        title: 'footer',
        description: 'Footer settings for the site',
      },

    ];
  
    try {
      console.log('🌱 Seeding site sections...');
      let thereAreSections = await prisma.siteSection.findMany();
      if (thereAreSections.length > 0) {
        console.log('🌱 There are sections, skipping seeding');
        return;
      }
      for (const section of sections) {
        await prisma.siteSection.create({
          data: section,
        });
      }

      console.log('✅ Site sections seeded successfully');
    } catch (error) {
      console.error('❌ Error seeding site sections:', error);
      throw error;
    }
  }
  