function toDate(date: string | Date): Date {
  return date instanceof Date ? date : new Date(date)
}

export function formatDateLong(date?: string | Date, locale: string = 'en-US') {
  if (!date) return

  const d = toDate(date)

  const day = d.getUTCDate()
  const year = d.getUTCFullYear()

  const month = new Intl.DateTimeFormat(locale, {
    month: 'long',
    timeZone: 'UTC',
  }).format(d)

  return `${month} ${day}${getOrdinalSuffix(day)}, ${year}`
}

export function formatDateShort(date?: string | Date) {
  if (!date) return

  const d = toDate(date)

  const month = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  const year = d.getUTCFullYear()

  return `${month}/${day}/${year}`
}

function getOrdinalSuffix(day: number) {
  if (day >= 11 && day <= 13) return 'th'

  switch (day % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}
