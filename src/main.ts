import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // định vị đường dẫn lại (ảnh)
  app.use(express.static('.'));

  //SWAGGER
  const config = new DocumentBuilder()
    .setTitle('Fiverr')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  await app.listen(8080);
}
bootstrap();
