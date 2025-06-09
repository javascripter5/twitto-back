import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { findDto } from "src/utils/dto/findDto"

export class FindPostDto extends findDto {

    @ApiProperty({ required: false })
    q?: string

    @ApiProperty({ required: false })
    qInTitle?: string

    @ApiProperty({ required: false })
    qInMeta?: string

    @ApiProperty({ required: false })
    timeframe?: string

    @IsOptional()
    @ApiProperty({ required: false })
    country?: any

    @IsOptional()
    @ApiProperty({ required: false })
    category?: any

    @IsOptional()
    @ApiProperty({ required: false })
    language?: string

    @ApiProperty({ required: false })
    domain?: string

    @ApiProperty({ required: false })
    domainurl?: string

    @ApiProperty({ required: false })
    excludedomain?: string

    @ApiProperty({ required: false })
    prioritydomain?: string

    @ApiProperty({ required: false })
    timezone?: string

    @ApiProperty({ required: false })
    full_content?: string

    @ApiProperty({ required: false })
    image?: string

    @ApiProperty({ required: false })
    video?: string

    @ApiProperty({ required: false })
    size?: string

    // @ApiProperty({ required: false })
    // page: string






}