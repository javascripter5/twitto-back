import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, Request, Req, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, SigninDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }


  // @UseGuards(AuthGuard('jwt'))
  // @Get('hello')
  // hello(@Request() req) {
  //   console.log(req.headers);
  //   console.log(req.user);

  //   return 'hello'
  // }



  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   console.log(createUserDto);

  //   return this.usersService.create(createUserDto);
  // }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
  }

  // @UseInterceptors(ClassSerializerInterceptor)
  // @Post('/signin')
  // signin(@Body() signinDto: SigninDto) {
  //   console.log(signinDto);

  //   let { email, password } = signinDto
  //   return this.usersService.signin(email, password);
  // }

  @Post("whoami")
  async whoami(@Body() body, @Req() req) {
    return await this.usersService.findById(req.user.id)
  }

  @Put()
  async update(@Body() updateUserDto: UpdateUserDto, @Req() req: any) {

    return await this.usersService.update(req.user.id, updateUserDto)
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
