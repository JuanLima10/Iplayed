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

export enum DateRangeType {
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  CUSTOM = 'custom',
}

export interface IDateRangeQuery {
  range?: DateRangeType;
  from?: string;
  to?: string;
  dateField?: string;
}

export interface IPrismaQuery {
  query: IQuery;
  searchableFields?: string[];
  allowedOrderBy?: string[];
  allowedDateFields?: string[];
  defaultOrderBy?: Record<string, string>;
  where?: IPrismaWhere;
}
