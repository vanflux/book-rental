import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { DatabaseModule } from "../database/database.module";
import { LanguagesController } from "./languages.controller";
import { LanguagesService } from "./languages.service";

@Module({
    controllers: [LanguagesController],
    exports: [LanguagesService],
    providers: [LanguagesService],
    imports: [DatabaseModule, AuthModule]
})
export class LanguagesModule {}
