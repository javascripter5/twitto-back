import { Global, Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [SessionsService],
  exports: [SessionsService]
})
export class SessionsModule { }
