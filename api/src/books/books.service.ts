import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Includeable, IncludeOptions, Op } from 'sequelize';
import { WhereOptions } from 'sequelize';
import slugify from 'slugify';
import { Constants } from '../constants';
import { BookGenre } from '../models/book-renre';
import { Book } from '../models/book.model';
import { Genre } from '../models/genre.model';
import { Language } from '../models/language.model';
import { Rental } from '../models/rental.model';
import {
  BookDto,
  CreateBookDto,
  GetBooksInputDto,
  GetBooksItemResultDto,
  GetBooksResultDto,
} from './books.dto';

@Injectable()
export class BooksService {
  constructor(
    @Inject(Constants.REPOSITORY.BOOK)
    private bookRepository: typeof Book,
    @Inject(Constants.REPOSITORY.RENTAL)
    private rentalRepository: typeof Rental,
    @Inject(Constants.REPOSITORY.BOOK_GENRE)
    private bookGenreRepository: typeof BookGenre,
  ) {}

  async getBooks(input: GetBooksInputDto): Promise<GetBooksResultDto> {
    const where: WhereOptions<Book> = {};
    const include: Includeable[] = [];
    if (input.containsName) {
      where.name = { [Op.iLike]: `%${input.containsName}%` };
    }
    if (input.containsAuthorName) {
      where.authorName = { [Op.iLike]: `%${input.containsAuthorName}%` };
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
          slug: input.genre,
        },
      });
    }
    const totalCount = await this.bookRepository.count({
      where,
      include,
    });
    const page = input.page ?? 0;
    const pageSize = Math.max(1, Math.min(100, input.pageSize ?? 20));
    const books = await this.bookRepository.findAll({
      where,
      include,
      attributes: ['id', 'name', 'slug', 'rentalId', 'bannerImageUrl'],
      offset: pageSize * page,
      limit: pageSize,
    });
    const items = books.map<GetBooksItemResultDto>((book) => ({
      id: book.id,
      name: book.name,
      slug: book.slug,
      rented: !!book.rentalId,
      bannerImageUrl: book.bannerImageUrl,
    }));
    return { items, totalCount };
  }

  async getBook(id: string) {
    const book = await this.bookRepository.findByPk(id, {
      include: [
        {
          model: Genre,
          as: 'genres',
          attributes: ['id', 'name', 'slug'],
        },
        {
          model: Language,
          as: 'language',
          attributes: ['id', 'name'],
        },
      ],
    });
    if (!book) throw new NotFoundException();
    return this.bookDtoFromEntity(book);
  }

  async getBookBySlug(slug: string) {
    const book = await this.bookRepository.findOne({
      where: {
        slug,
      },
      include: [
        {
          model: Genre,
          as: 'genres',
          attributes: ['id', 'name', 'slug'],
        },
        {
          model: Language,
          as: 'language',
          attributes: ['id', 'name'],
        },
      ],
    });
    if (!book) throw new NotFoundException();
    return this.bookDtoFromEntity(book);
  }

  async rentBook(userId: string, bookId: string) {
    const book = await this.bookRepository.findByPk(bookId);
    if (!book) throw new NotFoundException();
    if (book.rentalId) return new UnauthorizedException('Book already rented');
    const rentalBody = {
      id: randomUUID(),
      userId,
      bookId,
    };
    const rental = await this.rentalRepository.create(rentalBody);
    book.update({ rentalId: rentalBody.id });
    return rental;
  }

  async returnBook(bookId: string) {
    const book = await this.bookRepository.findByPk(bookId);
    if (!book) throw new NotFoundException();
    if (!book.rentalId) return new NotFoundException('Book not rented');
    const rental = await this.rentalRepository.findByPk(book.rentalId);
    const now = new Date();
    const updatedRental = await rental.update({ endedAt: now, updatedAt: now });
    await book.update({ rentalId: null });
    return updatedRental;
  }

  async createBook(createBookDto: CreateBookDto) {
    let genres: Genre[] = [];
    let language: Language | undefined = undefined;
    if (createBookDto.genresIds) {
      try {
        genres = await Promise.all(
          createBookDto.genresIds.map((id) => Genre.findByPk(id)),
        );
      } catch {
        throw new NotFoundException('Invalid genres');
      }
    }
    if (createBookDto.languageId) {
      try {
        language = await Language.findByPk(createBookDto.languageId);
      } catch {
        throw new NotFoundException('Invalid language');
      }
    }
    const book = await this.bookRepository.create({
      id: randomUUID(),
      slug: slugify(createBookDto.name),
      authorName: createBookDto.authorName,
      bannerImageUrl: createBookDto.bannerImageUrl,
      editorName: createBookDto.editorName,
      languageId: language?.id,
      name: createBookDto.name,
      pageCount: createBookDto.pageCount,
      publishedYear: createBookDto.publishedYear,
    });
    await Promise.all(
      genres.map((genre) =>
        this.bookGenreRepository.create({
          id: randomUUID(),
          bookId: book.id,
          genreId: genre.id,
        }),
      ),
    );
    await book.reload({
      include: [
        {
          model: Genre,
          as: 'genres',
          attributes: ['id', 'name', 'slug'],
        },
        {
          model: Language,
          as: 'language',
          attributes: ['id', 'name'],
        },
      ],
    });
    return this.bookDtoFromEntity(book);
  }

  async deleteBook(bookId: string) {
    const book = await this.bookRepository.findByPk(bookId);
    if (!book) throw new NotFoundException();
    if (book.rentalId) return new UnauthorizedException('Book is rented');
    await book.destroy();
  }

  private bookDtoFromEntity(book: Book): BookDto {
    return {
      id: book.id,
      authorName: book.authorName,
      genres: book.genres.map((genre) => ({
        id: genre.id,
        name: genre.name,
        slug: genre.slug,
      })),
      name: book.name,
      publishedYear: book.publishedYear,
      rented: !!book.rentalId,
      bannerImageUrl: book.bannerImageUrl,
      editorName: book.editorName,
      language: book.language
        ? {
            id: book.language.id,
            name: book.language.name,
          }
        : undefined,
      pageCount: book.pageCount,
    };
  }
}
