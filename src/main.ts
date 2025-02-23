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


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  
  // Apply CORS configuration
  app.enableCors(createCorsConfig(configService));
  
  // Use cookie parser
  app.use(cookieParser());
  
  // Set global prefix if you're using one
  app.setGlobalPrefix(API.PREFIX);
  
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
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
}
bootstrap();
