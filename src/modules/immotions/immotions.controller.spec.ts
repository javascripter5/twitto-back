import { Test, TestingModule } from '@nestjs/testing';
import { ImmotionsController } from './immotions.controller';
import { ImmotionsService } from './immotions.service';

describe('ImmotionsController', () => {
  let controller: ImmotionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImmotionsController],
      providers: [ImmotionsService],
    }).compile();

    controller = module.get<ImmotionsController>(ImmotionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
