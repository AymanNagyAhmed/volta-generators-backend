import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from '@/config/env.validation';
import { UsersModule } from '@/modules/users/users.module';
import { SettingsModule } from '@/modules/settings/settings.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { SiteSectionsModule } from '@/modules/site-sections/site-sections.module';

@Module({
  imports: [
    // Load and validate environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema
    }),
    AuthModule,
    SiteSectionsModule,
    SettingsModule,
    UsersModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
