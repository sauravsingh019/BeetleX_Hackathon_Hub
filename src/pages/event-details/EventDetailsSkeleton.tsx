import { Skeleton } from '@/components/ui'

export function EventDetailsSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading event details">
      <Skeleton className="h-10 w-2/3" />
      <Skeleton className="mt-3 h-5 w-1/2" />
      <div className="mt-8 space-y-4">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Skeleton className="h-48 lg:col-span-2" />
        <Skeleton className="h-48" />
      </div>
    </div>
  )
}
