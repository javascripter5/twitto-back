import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session) private sessionRepo: Repository<Session>
  ) { }
  async create(createSessionDto: CreateSessionDto) {
    const session = await this.sessionRepo.upsert(createSessionDto, { conflictPaths: { device: true } })
    return session
  }

  async findByUserId(user_id: number, device: string) {
    const session = await this.sessionRepo.find({
      where: {
        user_id,
        device
      }
    })

    return session
  }
}
