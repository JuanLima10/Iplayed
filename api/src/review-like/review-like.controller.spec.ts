import { Test, TestingModule } from '@nestjs/testing';
import { ReviewLikeController } from './review-like.controller';
import { ReviewLikeService } from './review-like.service';

describe('ReviewLikeController', () => {
  let controller: ReviewLikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewLikeController],
      providers: [ReviewLikeService],
    }).compile();

    controller = module.get<ReviewLikeController>(ReviewLikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
