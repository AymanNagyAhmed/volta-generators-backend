import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from '@/config/env.validation';
import { UsersModule } from '@/modules/users/users.module';
import { SettingsModule } from '@/modules/settings/settings.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { SiteSectionsModule } from '@/modules/site-sections/site-sections.module';
import { MulterConfig } from '@/config/multer.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // Load and validate environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema
    }),
    MulterConfig,
    AuthModule,
    SiteSectionsModule,
    SettingsModule,
    UsersModule,
    
    // Add ServeStaticModule
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public/uploads'),
      serveRoot: '/uploads',
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
