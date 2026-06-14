import { Skeleton } from '@/components/ui'

export function LandingSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading landing page">
      <Skeleton className="h-64 w-full rounded-2xl" />
      <div className="mt-16 space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full max-w-2xl" />
        <Skeleton className="h-4 w-full max-w-xl" />
        <Skeleton className="h-4 w-3/4 max-w-lg" />
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full" />
        ))}
      </div>
    </div>
  )
}
