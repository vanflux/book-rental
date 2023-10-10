import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authenticated } from '../auth/auth.decorator';
import { GetGenresResultDto } from './genres.dto';
import { GenresService } from './genres.service';

@ApiTags('genres')
@Controller('/genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get('')
  @Authenticated()
  @ApiResponse({ type: GetGenresResultDto })
  async getGenres() {
    return this.genresService.getGenres();
  }
}
