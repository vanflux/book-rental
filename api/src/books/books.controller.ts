import { Controller, Delete, ForbiddenException, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, Authenticated } from '../auth/auth.decorator';
import { AuthDto } from '../auth/auth.dto';
import { BookDto, GetBooksInputDto, GetBooksResultDto, RentalDto } from './books.dto';
import { BooksService } from './books.service';

@ApiTags('books')
@Controller('/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('')
  @Authenticated()
  @ApiResponse({ type: GetBooksResultDto })
  async getBooks(@Query() input: GetBooksInputDto) {
    return this.booksService.getBooks(input);
  }

  @Get('/slug/:slug')
  @Authenticated()
  @ApiResponse({ type: BookDto })
  async getBookBySlug(@Param('slug') slug: string) {
    return this.booksService.getBookBySlug(slug);
  }

  @Get('/:id')
  @Authenticated()
  @ApiResponse({ type: BookDto })
  async getBook(@Param('id') id: string) {
    return this.booksService.getBook(id);
  }

  @Get('/:id/rent')
  @Authenticated()
  @ApiResponse({ type: RentalDto })
  async rentBook(@Param('id') id: string, @Auth() auth: AuthDto) {
    if (!auth.userId) throw new ForbiddenException();
    return this.booksService.rentBook(auth.userId, id);
  }

  @Get('/:id/return')
  @Authenticated()
  @ApiResponse({ type: RentalDto })
  async returnBook(@Param('id') id: string) {
    return this.booksService.returnBook(id);
  }

  @Delete('/:id')
  @Authenticated()
  async deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
