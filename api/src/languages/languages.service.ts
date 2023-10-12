import { Inject, Injectable } from '@nestjs/common';
import { Constants } from '../constants';
import { Language } from '../models/language.model';
import {
  GetLanguagesItemResultDto,
  GetLanguagesResultDto,
} from './languages.dto';

@Injectable()
export class LanguagesService {
  constructor(
    @Inject(Constants.REPOSITORY.LANGUAGE)
    private languageRepository: typeof Language,
  ) {}

  async getLanguages(): Promise<GetLanguagesResultDto> {
    const languages = await this.languageRepository.findAll({
      attributes: ['id', 'name'],
    });
    const items = languages.map<GetLanguagesItemResultDto>((language) => ({
      id: language.id,
      name: language.name,
    }));
    const totalCount = items.length; // TODO: If pagination needed, the attribute is already here
    return { items, totalCount };
  }
}
