
// Get books dto

import { ApiProperty } from "@nestjs/swagger";

export class GetBooksInputDto {
    @ApiProperty({ required: false })
    public containsName?: string;

    @ApiProperty({ required: false })
    public containsAuthorName?: string;

    @ApiProperty({ required: false })
    public publishedYear?: number;
    
    @ApiProperty({ required: false })
    public genre?: string;

    @ApiProperty({ required: false })
    public pageSize?: number;

    @ApiProperty({ required: false })
    public page?: number;

    @ApiProperty({ required: false })
    public hideRented?: boolean;
}

export class GetBooksResultDto {
    @ApiProperty()
    public totalCount: number;
    
    @ApiProperty()
    public items: GetBooksItemResultDto[];
}

export class GetBooksItemResultDto {
    @ApiProperty()
    public id: string;

    @ApiProperty({ required: false })
    public bannerImageUrl?: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public slug: string;

    @ApiProperty()
    public rented: boolean;
}

// Get book dto

export class GetBookGenreDto {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public slug: string
}

export class GetBookLanguageDto {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public name: string;
}

export class BookDto {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public authorName: string;

    @ApiProperty()
    public publishedYear: number;

    @ApiProperty()
    public genres: GetBookGenreDto[];

    @ApiProperty()
    public editorName?: string;

    @ApiProperty()
    public language?: GetBookLanguageDto;

    @ApiProperty()
    public pageCount?: number;

    @ApiProperty({ required: false })
    public bannerImageUrl?: string;

    @ApiProperty()
    public rented: boolean;
}

// Rental dto

export class RentalDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public userId: string;

  @ApiProperty()
  public bookId: string

  @ApiProperty({ type: Date })
  public startedAt: Date

  @ApiProperty({ required: false, type: Date })
  public endedAt?: Date
}
