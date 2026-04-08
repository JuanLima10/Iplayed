export interface IPaginateInput {
  page: number;
  limit: number;
  count: number;
}

export interface IPaginateResponse extends IPaginateInput {
  pages: number;
}

export interface IPaginate<T> {
  data: T[];
  paginate: IPaginateResponse;
}
