import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto, SigninDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { Public } from 'src/utils/decorators/public.decorator';
import { SessionsService } from '../sessions/sessions.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private usersService: UsersService,

  ) { }
  @Public()
  @Post('/signin')
  signin(@Body() signinDto: SigninDto, @Req() req: any) {
    // console.log(req.headers);

    return this.usersService.validateUser(signinDto);
  }

  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    let signinDto = { email: createUserDto.email, password: createUserDto.password }

    let user = await this.usersService.signup(createUserDto);
    if (user) {
      return this.usersService.validateUser(signinDto);
    }
    return null
  }

}
