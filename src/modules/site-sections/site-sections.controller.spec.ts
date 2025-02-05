import { Test, TestingModule } from '@nestjs/testing';
import { SiteSectionsController } from './site-sections.controller';
import { SiteSectionsService } from './site-sections.service';

describe('SiteSectionsController', () => {
  let controller: SiteSectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SiteSectionsController],
      providers: [SiteSectionsService],
    }).compile();

    controller = module.get<SiteSectionsController>(SiteSectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
