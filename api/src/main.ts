import 'dotenv/config';

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaErrorInterceptor } from 'common/errors/prisma.inteceptor';
import { HttpExceptionFilter } from 'common/filters/http-exception.filter';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const frontendUrl = process.env.FRONTEND_URL;
  const frontendOrigin = frontendUrl ? new URL(frontendUrl).origin : undefined;

  app.enableCors({
    credentials: true,
    origin: frontendOrigin,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new PrismaErrorInterceptor());

  const config = new DocumentBuilder()
    .setTitle('IPlayed API')
    .setDescription('API for IPlayed')
    .setVersion('v2.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}

void bootstrap();
