import { Download, Search } from 'lucide-react'
import { useMemo, useState, memo } from 'react'
import { Badge, Button, Input, Skeleton } from '@/components/ui'
import { buildCsv, downloadCsv } from '@/lib/csv'
import type { OrganizerRegistrationRow } from '@/types'

interface RegistrationsTableProps {
  rows: OrganizerRegistrationRow[] | undefined
  isLoading: boolean
}

const statusVariant = {
  confirmed: 'success' as const,
  pending: 'warning' as const,
  waitlisted: 'default' as const,
}

export function RegistrationsTable({ rows, isLoading }: RegistrationsTableProps) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    if (!rows) return []
    const q = search.toLowerCase().trim()
    if (!q) return rows
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.teamName.toLowerCase().includes(q) ||
        r.trackName.toLowerCase().includes(q),
    )
  }, [rows, search])

  const exportCsv = () => {
    if (!filtered.length) return
    const csv = buildCsv(
      filtered.map((r) => ({
        name: r.name,
        email: r.email,
        team: r.teamName,
        track: r.trackName,
        status: r.status,
      })),
      ['name', 'email', 'team', 'track', 'status'],
    )
    downloadCsv('registrations.csv', csv)
  }

  if (isLoading) {
    return <Skeleton className="h-64 w-full" />
  }

  return (
    <section>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-lg font-semibold text-text-primary">Registration Management</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
              aria-hidden="true"
            />
            <Input
              type="search"
              placeholder="Search registrations…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
              aria-label="Search registrations"
            />
          </div>
          <Button variant="secondary" size="sm" onClick={exportCsv} disabled={!filtered.length}>
            <Download className="h-4 w-4" aria-hidden="true" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-surface-elevated">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
                Name
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
                Email
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
                Team
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
                Track
              </th>
              <th scope="col" className="px-4 py-3 font-medium text-text-secondary">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <RegistrationRow key={row.id} row={row} index={i} />
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-text-secondary">
                  No registrations match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

const RegistrationRow = memo(function RegistrationRow({ row, index }: { row: OrganizerRegistrationRow, index: number }) {
  return (
    <tr
      className={`border-t border-border ${index % 2 === 1 ? 'bg-surface-elevated/30' : ''}`}
    >
      <td className="px-4 py-3 font-medium text-text-primary">{row.name}</td>
      <td className="px-4 py-3 font-mono text-xs text-text-secondary">{row.email}</td>
      <td className="px-4 py-3 text-text-secondary">{row.teamName}</td>
      <td className="px-4 py-3 text-text-secondary">{row.trackName}</td>
      <td className="px-4 py-3">
        <Badge variant={statusVariant[row.status]}>{row.status}</Badge>
      </td>
    </tr>
  )
})
