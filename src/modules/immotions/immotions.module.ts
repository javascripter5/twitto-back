import { Module } from '@nestjs/common';
import { ImmotionsService } from './immotions.service';
import { ImmotionsController } from './immotions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Immotion } from './entities/immotion.entity';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [PostsModule, TypeOrmModule.forFeature([Immotion])],
  controllers: [ImmotionsController],
  providers: [ImmotionsService],
  exports: [ImmotionsService]
})
export class ImmotionsModule { }
