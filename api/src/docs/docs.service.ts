import { INestApplication, Injectable } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

@Injectable()
export class DocsService {
  setup(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Book Rental')
      .setDescription('Book Rental API')
      .setVersion('1.0.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
  }
}
