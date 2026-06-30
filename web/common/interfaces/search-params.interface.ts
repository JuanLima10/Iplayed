export interface IFilters {
  search?: string
  order?: string
  orderBy?: string
}

export interface ISearchParams {
  searchParams?: Promise<{
    tab?: string
    order?: 'asc' | 'desc'
    orderBy?: string
  }>
}
