
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../../modules/users/users.service';
import { lookup } from 'geoip-lite';

@Injectable()
export class AutoLogin implements NestMiddleware {
    constructor(private UsersService: UsersService) { }
    async use(request: Request, response: Response, next: NextFunction) {

        if (!(request.headers.Authorization)) {
            const { Authorization } = await this.UsersService.singWithoutEmail(request)
            request.headers.authorization = Authorization
            response.setHeader("authorization", Authorization)
        }
        response.setHeader("country", lookup(request.ip)?.country || "eg")
        next();
    }
}
