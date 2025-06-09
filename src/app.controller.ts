import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { lookup } from 'geoip-lite';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }
  @Post()
  hello(@Req() req: Request) {
    return { country: lookup(req.ip).country }
  }
}
