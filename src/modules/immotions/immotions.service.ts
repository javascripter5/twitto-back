import { HttpStatus, Inject, Injectable, Body } from '@nestjs/common';
import { CreateImmotionDto } from './dto/create-immotion.dto';
import { UpdateImmotionDto } from './dto/update-immotion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { REQUEST } from '@nestjs/core';
import { Immotion } from './entities/immotion.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/utils/api-response/api-response';
import { findDto } from 'src/utils/dto/findDto';
import { calculatePagination } from 'src/utils/pagination/globalFilters';
import { PostsService } from '../posts/posts.service';

@Injectable()
export class ImmotionsService {
  constructor(
    @InjectRepository(Immotion) private immotionRepo: Repository<Immotion>,
    private PostsService: PostsService,
    @Inject(REQUEST) private request: any,
  ) { }
  async create(createImmotionDto: CreateImmotionDto) {
    createImmotionDto.user_id = this.request.user.id
    const savedImmotion = await this.immotionRepo.upsert(createImmotionDto, { conflictPaths: { user_id: true, post_id: true }, upsertType: "on-conflict-do-update" })
    const post: any = await this.PostsService.findOne(createImmotionDto.post_id, this.request)
    return ApiResponse.successResponse("en", "CREATE", "CREATED", post)

  }

  async findAll(query: findDto) {
    let { page, limit, search = '', withDeleted = false, order = { id: 'DESC' }, orderKey, orderValue, ...filter } = query;
    let current_page = page
    let pagination = {};
    if (current_page && limit)
      pagination = { take: +limit, skip: (current_page - 1) * +limit };
    const [records, total] = await this.immotionRepo.findAndCount({
      relationLoadStrategy: "join",
      withDeleted,
      where: {
        ...filter,
      },
      ...pagination,
      order
    });
    let meta = calculatePagination(current_page, limit, total);
    return ApiResponse.findWithMeta("en", "success", "OK", meta, records);
  }

  async findOne(id: number) {
    const immotion = await this.immotionRepo.findOne({
      where: { id }
    });
    if (!immotion) return ApiResponse.notFoundResponse("en", "NOTFOUND");
    return ApiResponse.successResponse("en", "success", "OK", immotion)
  }

  async update(id: number, updateImmotionDto: UpdateImmotionDto) {
    const savedImmotion = await this.immotionRepo.upsert(updateImmotionDto, { conflictPaths: { user_id: true, post_id: true } })
    const immotion: any = await this.findOne(savedImmotion.identifiers[0].id)
    return ApiResponse.successResponse("en", "UPDATE", "OK", immotion)
  }

  async remove(id: number) {
    await this.immotionRepo.softDelete(id);
  }

  async restore(id: number) {
    await this.immotionRepo.restore(id);
  }

  async forceDelete(id: number) {
    await this.immotionRepo.delete(id);
  }

}