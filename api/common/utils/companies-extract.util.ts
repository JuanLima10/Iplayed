import { IGameIgdb } from 'common/interfaces/igdb.client.interface';

export function extractCompanies(companies?: IGameIgdb['involved_companies']) {
  const publishers = companies
    ?.filter((c) => c.publisher)
    .map((c) => c.company.name);

  const developers = companies
    ?.filter((c) => c.developer)
    .map((c) => c.company.name);

  return { publishers, developers };
}
