import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  controllers: [],
  exports: [...databaseProviders],
  imports: [],
  providers: [...databaseProviders],
})
export class DatabaseModule {}
