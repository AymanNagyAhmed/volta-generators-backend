import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from '@/common/filters/global-exception.filter';
import { TransformResponseInterceptor } from '@/common/interceptors/transform-response.interceptor';
import { API } from '@/common/constants/api.constants';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from '@/common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // api prefix
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
    .build();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 4000);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalFilters(new HttpExceptionFilter());





  await app.listen(port);
  console.log(`🚀 HTTP server running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
}
bootstrap();
