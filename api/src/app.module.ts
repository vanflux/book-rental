import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { DatabaseModule } from './database/database.module';
import { DocsModule } from './docs/docs.module';
import { GenresModule } from './genres/genres.module';
import { LanguagesModule } from './languages/languages.module';
import { loadConfig } from './load-config';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [loadConfig] }),
    AuthModule,
    BooksModule,
    DatabaseModule,
    DocsModule,
    GenresModule,
    LanguagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('*');
  }
}
