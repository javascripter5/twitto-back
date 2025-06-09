import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, MinLength, IsEmail, IsOptional, IsBoolean, IsDateString } from "class-validator";
import { CreateSessionDto } from "src/modules/sessions/dto/create-session.dto";
import { OauthType, User } from "../entities/user.entity";
import { Session } from "src/modules/sessions/entities/session.entity";

export class CreateUserDto implements User {

    @ApiProperty({ example: "abdo" })
    @IsOptional()
    // @IsString()
    name?: string

    @ApiProperty({ example: "123456789" })
    @IsOptional()
    // @IsString()
    oauthId?: string;

    @ApiProperty({ example: "google" })
    @IsOptional()
    oauthType?: OauthType;

    @ApiProperty({ example: "cairo" })
    @IsOptional()
    // @IsString()
    address?: string = 'default address'

    @ApiProperty({ example: "abdo@gmail.com" })
    @IsOptional()
    // @IsString()
    // @IsEmail()
    email?: string


    @ApiProperty({ example: "12345678" })
    @IsOptional()
    // @IsString()
    // @MinLength(8)
    password?: string


    @ApiProperty({ example: new Date() })
    @IsOptional()
    // @IsDateString()
    age?: string

    @ApiProperty({ example: "+201151761416" })
    @IsOptional()
    // @IsString()
    phone?: string

    @ApiProperty({ example: "ar" })
    @IsOptional()
    // @IsString()
    language?: string

    @ApiProperty({ example: "eg" })
    @IsOptional()
    // @IsString()
    country?: string


    @ApiProperty()
    @IsOptional()
    // @IsString()
    image?: string = 'image.jpg'

    sessions?: Session[];


}

export class SigninDto {
    @ApiProperty({ example: "abdo@gmail.com" })
    @IsString()
    @IsEmail()
    email: string

    @ApiProperty({ example: "12345678" })
    @IsString()
    password: string

}