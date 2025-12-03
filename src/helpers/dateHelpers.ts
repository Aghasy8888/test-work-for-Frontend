type DateInput = Date | string | null | undefined

const formatters = new Map<string, Intl.DateTimeFormat>()

const getFormatter = (locale: string): Intl.DateTimeFormat => {
  if (!formatters.has(locale)) {
    formatters.set(
      locale,
      new Intl.DateTimeFormat(locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    )
  }
  return formatters.get(locale)!
}

export const formatDate = (date: DateInput, locale = 'ru-RU'): string => {
  if (!date) return '—'
  const value = typeof date === 'string' ? new Date(date) : date
  if (Number.isNaN(value.getTime())) return '—'

  return getFormatter(locale).format(value)
}

