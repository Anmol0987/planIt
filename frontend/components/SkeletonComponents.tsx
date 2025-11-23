export function SkeletonHeader() {
  return (
    <div className="space-y-1">
      <div className="h-8 sm:h-9 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
      <div className="h-4 w-36 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
    </div>
  );
}

export function SkeletonTripCard() {
  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-sm">
      <div className="relative rounded-xl overflow-hidden h-[140px]">
        {/* Background shimmer - lighter colors */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer bg-[length:200%_100%]" />
        </div>

        <div className="relative z-10 p-5 flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="space-y-2 flex-1">
              {/* Title skeleton */}
              <div className="h-7 w-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 rounded animate-shimmer bg-[length:200%_100%]" />
              {/* Destination skeleton */}
              <div className="h-4 w-36 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 rounded animate-shimmer bg-[length:200%_100%]" />
            </div>

            {/* Menu button skeleton */}
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 animate-shimmer bg-[length:200%_100%]" />
          </div>

          {/* Date skeleton */}
          <div className="h-4 w-44 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-600 dark:via-gray-500 dark:to-gray-600 rounded animate-shimmer bg-[length:200%_100%]" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTripList({ count = 3 }: { count?: number }) {
  return (
    <section>
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonTripCard key={i} />
        ))}
      </div>
    </section>
  );
}

export function SkeletonPollCard() {
  return (
    <div className="p-4 space-y-3 w-full rounded-xl border border-border">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          {/* Question skeleton */}
          <div className="h-5 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
          {/* Type and status skeleton */}
          <div className="h-3 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
        </div>

        <div className="flex gap-2">
          {/* Delete button skeleton */}
          <div className="h-8 w-20 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
          {/* Close button skeleton */}
          <div className="h-8 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
        </div>
      </div>

      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 w-full"
          >
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center">
                {/* Option text skeleton */}
                <div className="h-4 w-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
                {/* Vote count skeleton */}
                <div className="h-3 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
              </div>

              {/* Progress bar skeleton */}
              <div className="h-2 w-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-full animate-shimmer bg-[length:200%_100%]" />
            </div>

            {/* Vote button skeleton */}
            <div className="h-8 w-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonTripDetails() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center py-8 px-4 bg-background text-foreground">
      <div className="w-full max-w-3xl space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-9 w-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
          <div className="h-10 w-full sm:w-24 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
        </div>

        {/* Trip Info Card Skeleton */}
        <div className="rounded-xl border border-border p-6 space-y-4">
          <div className="space-y-3">
            <div className="h-6 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
            <div className="h-5 w-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
            <div className="h-5 w-56 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
          </div>
          <div className="flex gap-2 pt-2">
            <div className="h-10 w-32 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
            <div className="h-10 w-28 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
          </div>
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="w-full max-w-3xl mt-6 mb-4 space-y-4">
        {/* Tab List Skeleton */}
        <div className="grid grid-cols-3 md:grid-cols-5 w-full gap-3 mb-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]"
            />
          ))}
        </div>

        {/* Tab Content Skeleton */}
        <div className="space-y-4 pt-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-border p-4 space-y-3"
            >
              <div className="h-5 w-3/4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
              <div className="h-4 w-1/2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
              <div className="h-4 w-2/3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded animate-shimmer bg-[length:200%_100%]" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
