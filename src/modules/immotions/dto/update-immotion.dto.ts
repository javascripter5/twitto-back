import { PartialType } from '@nestjs/swagger';
import { CreateImmotionDto } from './create-immotion.dto';

export class UpdateImmotionDto extends PartialType(CreateImmotionDto) {}
