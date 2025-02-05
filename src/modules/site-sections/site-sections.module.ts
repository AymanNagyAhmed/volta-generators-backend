import { Module } from '@nestjs/common';
import { SiteSectionsService } from './site-sections.service';
import { SiteSectionsController } from './site-sections.controller';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthModule } from '@/modules/auth/auth.module';
import { UsersModule } from '@/modules/users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule
  ],
  controllers: [SiteSectionsController],
  providers: [SiteSectionsService, PrismaService],
  exports: [SiteSectionsService],
})
export class SiteSectionsModule {}
