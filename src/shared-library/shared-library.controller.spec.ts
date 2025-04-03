import { Test, TestingModule } from '@nestjs/testing';
import { SharedLibraryController } from './shared-library.controller';
import { SharedLibraryService } from './shared-library.service';

describe('SharedLibraryController', () => {
  let controller: SharedLibraryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SharedLibraryController],
      providers: [SharedLibraryService],
    }).compile();

    controller = module.get<SharedLibraryController>(SharedLibraryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
