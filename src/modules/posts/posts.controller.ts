import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { findDto } from 'src/utils/dto/findDto';
import { FindPostDto } from './dto/find-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags("posts")
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) { }

  // @Post()
  // create(@Body() createPostDto: CreatePostDto) {
  //   return this.postsService.create(createPostDto);
  // }

  @Get()
  findAll(@Query() query: FindPostDto, @Req() req: Request) {
    return this.postsService.findAll(query, req);
  }

  @Get('apiTest')
  findApiTest() {
    return this.postsService.findApiTest();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    return this.postsService.findOne(+id, req);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
