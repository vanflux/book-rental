import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { DatabaseModule } from './database/database.module';
import { DocsModule } from './docs/docs.module';
import { GenresModule } from './genres/genres.module';
import { loadConfig } from './load-config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [loadConfig] }),
    AuthModule,
    BooksModule,
    DatabaseModule,
    DocsModule,
    GenresModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
