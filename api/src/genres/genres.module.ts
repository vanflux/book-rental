import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { GenresController } from "./genres.controller";
import { GenresService } from "./genres.service";

@Module({
    controllers: [GenresController],
    exports: [GenresService],
    providers: [GenresService],
    imports: [DatabaseModule]
})
export class GenresModule {}
