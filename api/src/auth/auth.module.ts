import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "../database/database.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
    controllers: [AuthController],
    exports: [AuthService],
    providers: [AuthService],
    imports: [DatabaseModule, ConfigModule]
})
export class AuthModule {}
