import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseModule } from '../database/database.module';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

@Module({
  controllers: [BooksController],
  exports: [BooksService],
  providers: [BooksService],
  imports: [DatabaseModule, AuthModule],
})
export class BooksModule {}
