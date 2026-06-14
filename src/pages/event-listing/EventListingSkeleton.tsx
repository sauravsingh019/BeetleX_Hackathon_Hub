import { Card, Skeleton } from '@/components/ui'

export function EventListingSkeleton() {
  return (
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Loading events"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <Card key={i} className="space-y-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-24" />
          </div>
        </Card>
      ))}
    </div>
  )
}
