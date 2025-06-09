import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) { }


  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req) {
    return await this.settingsService.findAnCheckByEmail(+id, req.user.email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto, @Req() req) {
    return this.settingsService.update(+id, updateSettingDto, req.user.email);
  }

}
