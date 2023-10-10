import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { DatabaseModule } from './database/database.module';
import { DocsModule } from './docs/docs.module';
import { GenresModule } from './genres/genres.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    DocsModule,
    BooksModule,
    GenresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
