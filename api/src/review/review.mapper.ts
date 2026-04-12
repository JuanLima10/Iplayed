import {
  IReviewSelect,
  reviewSelect,
} from 'common/interfaces/review.interface';
import { PrismaMapper } from 'prisma/prisma.mapper';
import { ResponseReviewDto } from './dto/response-review.dto';

export const ReviewMapper: PrismaMapper<IReviewSelect, ResponseReviewDto> = {
  select: reviewSelect,

  toResponse(this: void, review) {
    return {
      id: review.id,
      userId: review.user_id,
      gameId: review.game_id,
      text: review.text,
      createdAt: review.created_at,
      updatedAt: review.updated_at,
    };
  },
};
