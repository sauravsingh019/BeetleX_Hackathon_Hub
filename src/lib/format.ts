export function formatDate(iso: string, options?: Intl.DateTimeFormatOptions): string {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  })
}

export function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const sameYear = startDate.getFullYear() === endDate.getFullYear()
  const startFmt = startDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    ...(sameYear ? {} : { year: 'numeric' }),
  })
  const endFmt = endDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  return `${startFmt} – ${endFmt}`
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}
