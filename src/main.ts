import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'verbose'],
  });
  await app.listen(3000, () => {
    Logger.debug('HTTP Application started', 'NestApplication');
  });
}
bootstrap();
