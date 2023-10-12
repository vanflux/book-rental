// Get genres dto

import { ApiProperty } from '@nestjs/swagger';

export class GetGenresResultDto {
  @ApiProperty()
  public totalCount: number;

  @ApiProperty()
  public items: GetGenresItemResultDto[];
}

export class GetGenresItemResultDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  @ApiProperty()
  public slug: string;
}
