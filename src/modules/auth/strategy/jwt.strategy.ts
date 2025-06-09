import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, Body } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { SessionsService } from 'src/modules/sessions/sessions.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'jwt_secret_dentunity',
            passReqToCallback: true
        });
    }

    async validate(req: Request, payload) {
        return payload;
    }

}