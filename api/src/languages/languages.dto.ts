
// Get languages dto

import { ApiProperty } from "@nestjs/swagger";

export class GetLanguagesResultDto {
    @ApiProperty()
    public totalCount: number;
    
    @ApiProperty()
    public items: GetLanguagesItemResultDto[];
}

export class GetLanguagesItemResultDto {
    @ApiProperty()
    public id: string;

    @ApiProperty()
    public name: string;
}

