import { IQuery } from 'common/interfaces/query.util.interface';

export function normalizeQuery<T extends IQuery>(query?: T): IQuery {
  return {
    page: query?.page ?? 1,
    limit: query?.limit ?? 10,
    search: query?.search ?? '',
    orderBy: query?.orderBy ?? 'created_at',
    order: query?.order ?? 'asc',
    year: query?.year,
    month: query?.month,
    day: query?.day,
    dateField: query?.dateField ?? 'created_at',
  };
}
