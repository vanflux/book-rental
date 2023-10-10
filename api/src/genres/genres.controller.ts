import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetGenresResultDto } from './genres.dto';
import { GenresService } from './genres.service';

@Controller('/genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Get('')
  @ApiResponse({ type: GetGenresResultDto })
  async getGenres() {
    return this.genresService.getGenres();
  }
}
