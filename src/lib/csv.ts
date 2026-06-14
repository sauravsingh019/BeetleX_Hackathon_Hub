export function buildCsv(rows: Record<string, string | number | undefined>[], columns: string[]) {
  const escape = (value: string) => {
    if (value.includes(',') || value.includes('"') || value.includes('\n')) {
      return `"${value.replace(/"/g, '""')}"`
    }
    return value
  }

  const header = columns.map(escape).join(',')
  const body = rows
    .map((row) => columns.map((col) => escape(String(row[col] ?? ''))).join(','))
    .join('\n')

  return `${header}\n${body}`
}

export function downloadCsv(filename: string, content: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
