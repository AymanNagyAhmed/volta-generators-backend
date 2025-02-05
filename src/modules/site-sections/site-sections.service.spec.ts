import { Test, TestingModule } from '@nestjs/testing';
import { SiteSectionsService } from './site-sections.service';

describe('SiteSectionsService', () => {
  let service: SiteSectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteSectionsService],
    }).compile();

    service = module.get<SiteSectionsService>(SiteSectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
