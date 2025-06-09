import { Test, TestingModule } from '@nestjs/testing';
import { ImmotionsService } from './immotions.service';

describe('ImmotionsService', () => {
  let service: ImmotionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImmotionsService],
    }).compile();

    service = module.get<ImmotionsService>(ImmotionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
