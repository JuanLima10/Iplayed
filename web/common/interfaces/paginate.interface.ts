export interface IPaginate {
  page: number
  limit: number
  pages: number
  count: number
}

export interface IPaginateProps {
  paginate?: IPaginate
  param?: string
  className?: string
}
