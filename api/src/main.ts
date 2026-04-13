import 'dotenv/config';

import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaErrorInterceptor } from 'common/errors/prisma.inteceptor';
import { HttpExceptionFilter } from 'common/filters/http-exception.filter';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        if (process.env.NODE_ENV === 'developer')
          return new BadRequestException(errors);
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new PrismaErrorInterceptor());

  const config = new DocumentBuilder()
    .setTitle('IPlayed API')
    .setDescription('API for IPlayed')
    .setVersion('v0.4.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT || 3000);
}

void bootstrap();
