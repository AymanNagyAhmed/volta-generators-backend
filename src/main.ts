import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';
import { TransformResponseInterceptor } from '@/common/interceptors/transform-response.interceptor';
import { API } from '@/common/constants/api.constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';
import * as cookieParser from 'cookie-parser';
import { createCorsConfig } from './config/cors.config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  const configService = app.get(ConfigService);
  
  // Apply CORS configuration
  app.enableCors(createCorsConfig(configService));
  
  // Use cookie parser
  app.use(cookieParser());
  
  // Serve static files
  app.useStaticAssets(join(__dirname, '..', 'public/uploads'), {
    prefix: '/uploads',
  });
  
  // Set global prefix if you're using one
  app.setGlobalPrefix(API.PREFIX,{
    exclude: ['/public/*']
  });
  app.useStaticAssets(join(process.cwd(), 'public'), {
    prefix: '/public',
    index: false
  });
  
  // Global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Global response transformer
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('volta-generators API')
    .setDescription('API documentation for Volta-generator system')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('1. Auth', 'Authentication endpoints')
    .addTag('2. Site Sections', 'Site sections management')
    .addTag('3. Settings', 'Application settings')
    .addTag('4. Users', 'User management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);


  // Add cookie parser middleware
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());

  const port = configService.get<number>('PORT', 4000);
  const databaseUrl = `${configService.get<string>('DB_TYPE')}://${
    configService.get<string>('DB_USER')}:${
    configService.get<string>('DB_PASSWORD')}@${
    configService.get<string>('DB_HOST')}:${
    configService.get<string>('DB_PORT')}/${
    configService.get<string>('DB_NAME')}?authSource=${
    configService.get<string>('DB_NAME')}`;
  const databaseUrlFromEnv = configService.get<string>('DATABASE_URL');
  await app.listen(port);
  console.log(`🗄️  Database URL: \n${databaseUrl}`);
  console.log(`🗄️  Database URL from env: \n${databaseUrlFromEnv}`);
  console.log(`🚀 Application is running on: \nhttp://localhost:${port}`);
  console.log(`📚 Swagger documentation: \nhttp://localhost:${port}/api/docs`);
}
bootstrap();

