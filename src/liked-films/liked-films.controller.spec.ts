import { Test, TestingModule } from '@nestjs/testing';
import { LikedFilmsController } from './liked-films.controller';

describe('LikedFilmsController', () => {
  let controller: LikedFilmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikedFilmsController],
    }).compile();

    controller = module.get<LikedFilmsController>(LikedFilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
