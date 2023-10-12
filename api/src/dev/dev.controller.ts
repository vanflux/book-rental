import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DevService } from './dev.service';

@ApiTags('dev')
@Controller('/dev')
export class DevController {
  constructor(private readonly devService: DevService) {}

  @Get('/status')
  async status() {
    return 'OK';
  }

  @Post('/db/drop')
  async dbDrop() {
    return this.devService.dropSchemas();
  }

  @Post('/db/sync')
  async dbSync() {
    return this.devService.sync();
  }

  @Post('/db/seed')
  async dbSeed() {
    return this.devService.seed();
  }

  @Post('/db/recreate')
  async dbRecreate() {
    return this.devService.recreateDb();
  }
}
