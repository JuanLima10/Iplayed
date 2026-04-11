import { IQuery } from './query.util.interface';

type IWhere =
  | boolean
  | string
  | number
  | null
  | { gte: Date; lt: Date }
  | Array<Record<string, unknown>>
  | Record<string, unknown>;

export type IPrismaWhere = Record<string, IWhere>;

export interface IPrismaQuery {
  query: IQuery;
  searchableFields?: string[];
  allowedOrderBy?: string[];
  allowedDateFields?: string[];
  where?: IPrismaWhere;
}
