import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { DevController } from "./dev.controller";
import { DevService } from "./dev.service";

@Module({
    controllers: [DevController],
    exports: [DevService],
    providers: [DevService],
    imports: [DatabaseModule]
})
export class DevModule {}
