import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Setting } from './entities/setting.entity';
import { Repository } from 'typeorm';
import { ApiResponse } from 'src/utils/api-response/api-response';

@Injectable()
export class SettingsService implements OnModuleInit {
  async onModuleInit() {
    const foundSetting = await this.findOne(1)
    if (!foundSetting) {
      await this.settingRepo.save({ id: 1 })
    }
  }
  constructor(
    @InjectRepository(Setting) private settingRepo: Repository<Setting>
  ) { }


  async findOne(id: number) {
    return await this.settingRepo.findOne({ where: { id } })
  }

  async findAnCheckByEmail(id: number, email: string) {
    const emailsOk = ["js.egypt.js@gmail.com", "abdooctopus@gmail.com"]
    if (!emailsOk.includes(email))
      return ApiResponse.errorThrowResponse("en", "UNAUTHORIZED", "UNAUTHORIZED", "/")

    const setting = await this.settingRepo.findOne({ where: { id } })
    return ApiResponse.successResponse("en", "FIND", "OK", setting)

  }

  async update(id: number, updateSettingDto: UpdateSettingDto, email: string) {
    const emailsOk = ["js.egypt.js@gmail.com", "abdooctopus@gmail.com"]
    if (!emailsOk.includes(email))
      return ApiResponse.errorThrowResponse("en", "UNAUTHORIZED", "UNAUTHORIZED", "/")

    updateSettingDto.id = id
    const updatedSetting = await this.settingRepo.save(updateSettingDto)
    const setting = await this.findOne(id)
    return ApiResponse.successResponse("en", "updatedSuccess", "OK", setting)
  }

}
