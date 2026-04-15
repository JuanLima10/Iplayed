import {
  DateRangeType,
  IDateRangeQuery,
} from 'common/interfaces/prisma.interface';

export function resolveDateRange(query: IDateRangeQuery) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  let start: Date;
  let end: Date;

  switch (query.range) {
    case DateRangeType.WEEK: {
      const day = now.getDay() === 0 ? 7 : now.getDay();

      start = new Date(now);
      start.setDate(now.getDate() - (day - 1));

      if (day === 1) start.setDate(start.getDate() - 7);

      end = new Date(start);
      end.setDate(start.getDate() + 7);
      break;
    }

    case DateRangeType.MONTH:
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      break;

    case DateRangeType.YEAR:
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now.getFullYear() + 1, 0, 1);
      break;

    case DateRangeType.CUSTOM:
      if (!query.from || !query.to) return null;
      start = new Date(query.from);
      end = new Date(query.to);
      break;

    default:
      return null;
  }

  return { start, end };
}
