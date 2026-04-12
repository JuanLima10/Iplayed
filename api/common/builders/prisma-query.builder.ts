import { Prisma } from '@prisma/client';
import { IPrismaQuery, IPrismaWhere } from 'common/interfaces/prisma.interface';

export function buildPrismaQuery({
  query,
  searchableFields = [],
  allowedOrderBy = [],
  where: baseWhere = {},
}: IPrismaQuery) {
  const where: IPrismaWhere = { ...baseWhere };

  if (query.search && searchableFields.length > 0) {
    where.OR = searchableFields.map((field) => {
      if (field.includes('.')) {
        const [relation, column] = field.split('.');

        return {
          [relation]: {
            [column]: { contains: query.search, mode: 'insensitive' },
          },
        };
      }
      return { [field]: { contains: query.search, mode: 'insensitive' } };
    });
  }

  if (query.rating !== undefined) {
    where.rating = query.rating;
  }

  if (query.status !== undefined) {
    where.status = query.status;
  }

  if (query.isBest !== undefined) {
    const isBest = query.isBest ? { not: null } : { equals: null };
    where.best = isBest;
  }

  if (query.isFavorite !== undefined) {
    where.is_favorite = query.isFavorite;
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

  let orderBy: Prisma.Enumerable<Prisma.reviewOrderByWithRelationInput>;

  if (query.orderBy === 'popular') {
    orderBy = {
      game: {
        reviews: {
          _count: sortOrder,
        },
      },
    };
  } else if (
    query.orderBy &&
    allowedOrderBy.length > 0 &&
    allowedOrderBy.includes(query.orderBy)
  ) {
    orderBy = { [query.orderBy]: sortOrder };
  } else {
    orderBy = { created_at: 'desc' };
  }

  return {
    where,
    orderBy,
    skip: ((query.page || 1) - 1) * (query.limit || 10),
    take: query.limit || 10,
  };
}
