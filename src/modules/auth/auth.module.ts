import { Global, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { SessionsModule } from '../sessions/sessions.module';
@Module({
  imports: [UsersModule, SessionsModule, PassportModule,
    JwtModule.register({
      secret: 'jwt_secret_dentunity',
      signOptions: { expiresIn: '600000s' },
    }),
  ],
  controllers: [AuthController],
  providers: [JwtStrategy]
})
export class AuthModule { }
