import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    return { greetings: "welcome to eagle news" };
  }
}
