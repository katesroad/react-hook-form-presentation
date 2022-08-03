/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const globalPrefix = 'api';
  const port = process.env.PORT || 8080;

  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  await app.listen(port);

  Logger.log(
    `\n
    🚀 Application is running on: http://localhost:${port}/${globalPrefix}
    \n`
  );
}

bootstrap();
