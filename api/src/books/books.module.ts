import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { BooksController } from "./books.controller";
import { BooksService } from "./books.service";

@Module({
    controllers: [BooksController],
    exports: [BooksService],
    providers: [BooksService],
    imports: [DatabaseModule]
})
export class BooksModule {}
