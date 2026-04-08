import { Prisma } from '@prisma/client';
import { IPrismaQuery, IPrismaWhere } from 'common/interfaces/prisma.interface';

export function buildPrismaQuery({
  query,
  searchableFields,
  allowedOrderBy,
  where: baseWhere = {},
}: IPrismaQuery) {
  const where: IPrismaWhere = { ...baseWhere };

  if (query.search) {
    where.OR = searchableFields.map((field) => ({
      [field]: { contains: query.search, mode: 'insensitive' },
    }));
  }

  if (query.year || query.month || query.day) {
    const dateField =
      query.dateField === 'updated_at' ? 'updated_at' : 'created_at';

    const from = new Date(
      query.year ?? 1970,
      (query.month ?? 1) - 1,
      query.day ?? 1,
    );

    const to = new Date(from);

    if (query.day) to.setDate(to.getDate() + 1);
    else if (query.month) to.setMonth(to.getMonth() + 1);
    else if (query.year) to.setFullYear(to.getFullYear() + 1);

    where[dateField] = { gte: from, lt: to };
  }

  const sortOrder: Prisma.SortOrder = query.order ?? 'asc';
  const orderBy =
    query.orderBy && allowedOrderBy.includes(query.orderBy)
      ? { [query.orderBy]: sortOrder }
      : { created_at: 'desc' as Prisma.SortOrder };

  return {
    where,
    orderBy,
    skip: ((query.page || 1) - 1) * (query.limit || 10),
    take: query.limit || 10,
  };
}
