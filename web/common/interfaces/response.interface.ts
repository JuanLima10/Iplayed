import { IPaginate } from './paginate.interface'

export interface IResponse<T> {
  data: T
  paginate?: IPaginate
}
