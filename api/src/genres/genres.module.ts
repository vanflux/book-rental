import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { GenresController } from "./genres.controller";
import { GenresService } from "./genres.service";

@Module({
    controllers: [GenresController],
    exports: [GenresService],
    providers: [GenresService],
    imports: [DatabaseModule, AuthModule]
})
export class GenresModule {}
