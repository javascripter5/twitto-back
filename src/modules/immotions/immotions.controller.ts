import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ImmotionsService } from './immotions.service';
import { CreateImmotionDto } from './dto/create-immotion.dto';
import { UpdateImmotionDto } from './dto/update-immotion.dto';
import { findDto, findOneDto } from 'src/utils/dto/findDto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("immotions")
@Controller('immotions')
export class ImmotionsController {
  constructor(private readonly immotionsService: ImmotionsService) { }

  @Post()
  create(@Body() createimmotionDto: CreateImmotionDto) {
    return this.immotionsService.create(createimmotionDto);
  }

  @Get()
  findAll(@Query() query: findDto) {
    return this.immotionsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param("id", ParseIntPipe) id: string, @Query() query?: findOneDto) {
    return this.immotionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateImmotionDto: UpdateImmotionDto) {
    return this.immotionsService.update(+id, updateImmotionDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.immotionsService.remove(+id);
  }
}
