import { Global, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { APP_GUARD } from '@nestjs/core';
import { SessionsModule } from '../sessions/sessions.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';

@Global()
@Module({
  exports: [UsersService],
  imports: [SessionsModule,
    JwtModule.register({
      secret: 'jwt_secret_dentunity',
      signOptions: { expiresIn: '600000s' },
    }),

    TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy]
})
export class UsersModule { }
