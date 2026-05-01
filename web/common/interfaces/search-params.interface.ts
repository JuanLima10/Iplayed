export interface ISearchParams {
  searchParams?: Promise<Record<string, string | string[] | undefined>>
  clientParams?: Record<string, string | string[] | undefined>
}
