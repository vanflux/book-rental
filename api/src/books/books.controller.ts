import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { GetBookDto, GetBooksInputDto, GetBooksResultDto } from './books.dto';
import { BooksService } from './books.service';

@Controller('/books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('')
  @ApiResponse({ type: GetBooksResultDto })
  async getBooks(@Query() input: GetBooksInputDto) {
    return this.booksService.getBooks(input);
  }

  @Get(':id')
  @ApiResponse({ type: GetBookDto })
  async getBook(@Param('id') id: string) {
    return this.booksService.getBook(id);
  }
}
