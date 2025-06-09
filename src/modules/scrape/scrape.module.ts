import { Module } from '@nestjs/common';
import { ScrapeService } from './scrape.service';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [PostsModule],
  providers: [ScrapeService],
  exports: [ScrapeService]
})
export class ScrapeModule { }
