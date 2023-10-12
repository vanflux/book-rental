import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../constants';
import { Genre } from '../models/genre.model';
import { GetGenresItemResultDto, GetGenresResultDto } from './genres.dto';

@Injectable()
export class GenresService {
  constructor(
    @Inject(Constants.REPOSITORY.GENRE)
    private genreRepository: typeof Genre,
  ) {}

  async getGenres(): Promise<GetGenresResultDto> {
    const genres = await this.genreRepository.findAll({
      attributes: ['id', 'name', 'slug'],
    });
    const items = genres.map<GetGenresItemResultDto>((genre) => ({
      id: genre.id,
      name: genre.name,
      slug: genre.slug,
    }));
    const totalCount = items.length; // If pagination needed, the attribute is already here
    return { items, totalCount };
  }
}
