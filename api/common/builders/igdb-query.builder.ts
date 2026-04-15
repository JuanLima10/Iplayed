import {
  IGameIgdbQuery,
  IGDB_PRESETS,
  IgdbOrderBy,
} from 'common/interfaces/igdb.client.interface';

function toUnix(date: string): number {
  return Math.floor(new Date(date).getTime() / 1000);
}

export function buildIgdbQuery({
  query,
  fields,
  where,
  sortBy,
  order,
  limit,
  offset,
}: IGameIgdbQuery): string {
  const page = query?.page ?? 1;
  const take = limit ?? query?.limit ?? 10;
  const skip = offset ?? (page - 1) * take;

  const presetKey =
    query?.search || query?.orderBy === IgdbOrderBy.SEARCH
      ? undefined
      : (query?.orderBy ?? IgdbOrderBy.POPULAR);
  const preset = presetKey ? IGDB_PRESETS[presetKey] : undefined;

  const clauses: string[] = [];
  if (where ?? preset?.where) clauses.push((where ?? preset?.where)!);
  if (query?.releasedAfter)
    clauses.push(`first_release_date >= ${toUnix(query.releasedAfter)}`);
  if (query?.releasedBefore)
    clauses.push(`first_release_date <= ${toUnix(query.releasedBefore)}`);

  const finalWhere = clauses.length ? clauses.join(' & ') : undefined;
  const finalSortBy = sortBy ?? preset?.sortBy;
  const finalOrder = order ?? query?.order ?? preset?.order;

  return [
    query?.search ? `search "${query.search}";` : '',
    `${fields};`,
    finalWhere ? `where ${finalWhere};` : '',
    finalSortBy && finalOrder ? `sort ${finalSortBy} ${finalOrder};` : '',
    `limit ${take};`,
    `offset ${skip};`,
  ]
    .filter(Boolean)
    .join(' ');
}
