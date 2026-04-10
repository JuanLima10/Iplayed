import { IQuery } from 'common/interfaces/query.util.interface';

export function normalizeQuery<T extends IQuery>(query?: T): T & IQuery {
  return {
    ...query,
    page: query?.page ?? 1,
    limit: query?.limit ?? 10,
    search: query?.search ?? '',
    orderBy: query?.orderBy,
    order: query?.order ?? 'desc',
    year: query?.year,
    month: query?.month,
    day: query?.day,
    dateField: query?.dateField ?? 'created_at',
  } as T & IQuery;
}
