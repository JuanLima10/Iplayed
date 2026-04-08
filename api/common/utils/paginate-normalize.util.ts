import { BadRequestError } from 'common/errors/http-status.error';
import {
  IPaginateInput,
  IPaginateResponse,
} from 'common/interfaces/paginate.util.interface';

export function normalizePaginate({
  page,
  limit,
  count,
}: IPaginateInput): IPaginateResponse {
  if (page < 1 || limit < 1) {
    throw new BadRequestError('Invalid pagination parameters');
  }

  const pages = Math.max(Math.ceil(count / limit), 1);
  if (page > pages && count > 0) {
    throw new BadRequestError('Page out of range');
  }

  return { page, limit, pages, count };
}
