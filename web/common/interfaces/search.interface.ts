export const PATH_MAP = {
  '/people': {
    path: '/people',
    placeholder: 'Search people...',
  },
  '/games': {
    path: '/games',
    placeholder: 'Search games...',
  },
}

export interface ISearchQuery {
  path?: string
  param?: string
  debounceMs?: number
}
