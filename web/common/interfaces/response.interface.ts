export interface IResponse<T> {
  data: T
  paginate?: {
    page: number
    limit: number
    pages: number
    count: number
  }
}
