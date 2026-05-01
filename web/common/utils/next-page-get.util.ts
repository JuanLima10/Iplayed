export function getNextPage(paginate?: { page: number; pages: number }) {
  if (!paginate) return undefined

  const currentPage = paginate.page ?? 1
  const totalPages = paginate.pages ?? 0
  return currentPage < totalPages ? currentPage + 1 : undefined
}
