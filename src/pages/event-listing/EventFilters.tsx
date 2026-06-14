import type { EventStatus } from '@/types'
import { Input } from '@/components/ui'
import type { EventFilterParams } from './eventListingUtils'

const statusOptions: { value: EventStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'closed', label: 'Closed' },
]

interface EventFiltersProps {
  filters: EventFilterParams
  trackOptions: { id: string; name: string }[]
  search: string
  onFiltersChange: (filters: EventFilterParams) => void
  onSearchChange: (search: string) => void
}

function toggleValue<T extends string>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

export function EventFilters({
  filters,
  trackOptions,
  search,
  onFiltersChange,
  onSearchChange,
}: EventFiltersProps) {
  return (
    <div className="space-y-6 rounded-xl border border-border bg-surface p-5">
      <Input
        label="Search events"
        type="search"
        placeholder="Search by name or description…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Search events by name or description"
      />

      <fieldset>
        <legend className="mb-2 text-sm font-medium text-text-secondary">Status</legend>
        <div className="flex flex-wrap gap-3">
          {statusOptions.map(({ value, label }) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 text-sm text-text-primary"
            >
              <input
                type="checkbox"
                checked={filters.status.includes(value)}
                onChange={() =>
                  onFiltersChange({
                    ...filters,
                    status: toggleValue(filters.status, value),
                  })
                }
                className="rounded border-border accent-accent focus-visible:ring-2 focus-visible:ring-accent"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {trackOptions.length > 0 && (
        <fieldset>
          <legend className="mb-2 text-sm font-medium text-text-secondary">Track</legend>
          <div className="flex flex-wrap gap-3">
            {trackOptions.map(({ id, name }) => (
              <label
                key={id}
                className="flex cursor-pointer items-center gap-2 text-sm text-text-primary"
              >
                <input
                  type="checkbox"
                  checked={filters.track.includes(id)}
                  onChange={() =>
                    onFiltersChange({
                      ...filters,
                      track: toggleValue(filters.track, id),
                    })
                  }
                  className="rounded border-border accent-accent focus-visible:ring-2 focus-visible:ring-accent"
                />
                {name}
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="From date"
          type="date"
          value={filters.from}
          onChange={(e) => onFiltersChange({ ...filters, from: e.target.value })}
        />
        <Input
          label="To date"
          type="date"
          value={filters.to}
          onChange={(e) => onFiltersChange({ ...filters, to: e.target.value })}
        />
      </div>
    </div>
  )
}
