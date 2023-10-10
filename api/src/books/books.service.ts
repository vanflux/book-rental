import { Inject, Injectable } from '@nestjs/common';
import { Includeable, IncludeOptions, Op } from 'sequelize';
import { WhereOptions } from 'sequelize';
import { Constants } from '../constants';
import { Book } from '../models/book.model';
import { Genre } from '../models/genre.model';
import { Language } from '../models/language.model';
import { GetBookDto, GetBooksInputDto, GetBooksItemResultDto, GetBooksResultDto } from './books.dto';

@Injectable()
export class BooksService {
  constructor(
    @Inject(Constants.REPOSITORY.BOOK)
    private bookRepository: typeof Book,
  ) {}

  async getBooks(input: GetBooksInputDto): Promise<GetBooksResultDto> {
    const where: WhereOptions<Book> = {};
    const include: Includeable[] = [];
    if (input.containsName) {
      where.name = { [Op.iLike]: input.containsName };
    }
    if (input.containsAuthorName) {
      where.authorName = { [Op.iLike]: input.containsAuthorName };
    }
    if (input.hideRented) {
      where.rentalId = null;
    }
    if (input.publishedYear) {
      where.publishedYear = input.publishedYear;
    }
    if (input.genre) {
      include.push({
        model: Genre,
        as: 'genres',
        required: true,
        where: {
          id: input.genre,
        }
      });
    }
    const totalCount = await this.bookRepository.count({
      where,
      include
    });
    const page = input.page ?? 0;
    const pageSize = Math.max(1, Math.min(100, input.pageSize ?? 20));
    const books = await this.bookRepository.findAll({
      where,
      include,
      attributes: ['id', 'bannerImageUrl', 'name', 'rentalId'],
      offset: pageSize * page,
      limit: pageSize,
    });
    const items = books.map<GetBooksItemResultDto>(book => ({
      id: book.id,
      name: book.name,
      rented: !!book.rentalId,
      bannerImageUrl: book.bannerImageUrl,
    }));
    return { items, totalCount };
  }

  async getBook(id: string) {
    const book = await this.bookRepository.findByPk(id, {
      include: [{
        model: Genre,
        as: 'genres',
        attributes: ['id', 'name']
      }, {
        model: Language,
        as: 'language',
        attributes: ['id', 'name']
      }]
    });
    const result: GetBookDto = {
      id: book.id,
      authorName: book.authorName,
      genres: book.genres.map(genre => ({
        id: genre.id,
        name: genre.name,
      })),
      name: book.name,
      publishedYear: book.publishedYear,
      rented: !!book.rentalId,
      bannerImageUrl: book.bannerImageUrl,
      editorName: book.editorName,
      language: book.language ? {
        id: book.language.id,
        name: book.language.name
      } : undefined,
      pageCount: book.pageCount
    };
    return result;
  }
}
