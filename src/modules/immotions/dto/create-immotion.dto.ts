import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateImmotionDto {
    @ApiProperty()
    @IsOptional()
    user_id: number | null

    @ApiProperty()
    @IsOptional()
    post_id: number | null

    @ApiProperty()
    @IsOptional()
    comment?: string | null

    @ApiProperty()
    @IsOptional()
    shared?: boolean | null

    @ApiProperty()
    @IsOptional()
    like?: number | null

}
