import { Inject, Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize';
import { Constants } from '../constants';
import { runTestDataSeed } from '../database/seeders/test-data';

@Injectable()
export class DevService {
  constructor(
    @Inject(Constants.SEQUELIZE)
    private sequelize: Sequelize,
  ) {}

  async dropSchemas(): Promise<void> {
    await this.sequelize.dropAllSchemas({ logging: true });
  }

  async sync(): Promise<void> {
    await this.sequelize.sync({ alter: true });
  }

  async seed(): Promise<void> {
    const queryInterface = await this.sequelize.getQueryInterface();
    await runTestDataSeed(queryInterface);
  }

  async recreateDb() {
    await this.dropSchemas();
    await this.sync();
    await this.seed();
  }
}
