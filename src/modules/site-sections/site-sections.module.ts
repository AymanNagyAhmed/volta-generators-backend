import { Module } from '@nestjs/common';
import { SiteSectionsService } from './site-sections.service';
import { SiteSectionsController } from './site-sections.controller';
import { PrismaService } from '@/prisma/prisma.service';

@Module({
  controllers: [SiteSectionsController],
  providers: [SiteSectionsService, PrismaService],
  exports: [SiteSectionsService],
})
export class SiteSectionsModule {}
