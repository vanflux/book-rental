import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authenticated } from '../auth/auth.decorator';
import { GetBookDto, GetBooksInputDto, GetBooksResultDto } from './books.dto';
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

  @Get(':id')
  @Authenticated()
  @ApiResponse({ type: GetBookDto })
  async getBook(@Param('id') id: string) {
    return this.booksService.getBook(id);
  }
}
