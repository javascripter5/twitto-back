import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { ReStructureService } from './reStructureApis/structure-post.service';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), SettingsModule],
  controllers: [PostsController],
  providers: [PostsService, ReStructureService],
  exports: [PostsService, ReStructureService]
})
export class PostsModule { }
