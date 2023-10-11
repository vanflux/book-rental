import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authenticated } from '../auth/auth.decorator';
import { GetLanguagesResultDto } from './languages.dto';
import { LanguagesService } from './languages.service';

@ApiTags('languages')
@Controller('/languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Get('')
  @Authenticated()
  @ApiResponse({ type: GetLanguagesResultDto })
  async getLanguages() {
    return this.languagesService.getLanguages();
  }
}
