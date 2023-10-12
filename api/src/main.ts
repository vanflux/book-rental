import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocsService } from './docs/docs.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.resolve(DocsService).then((docs) => docs.setup(app));
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });
  await app.listen(3000);
}
bootstrap();
