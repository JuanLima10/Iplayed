import { ITruncateOptions } from '../interfaces/truncate.interface'

export function truncate(
  text: string,
  { maxLength, ellipsis = '...', trim = true }: ITruncateOptions
) {
  if (text.length <= maxLength) return text

  const sliced = text.slice(0, maxLength)
  return `${trim ? sliced.trimEnd() : sliced}${ellipsis}`
}
