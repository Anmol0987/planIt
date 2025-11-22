export function SkeletonDashBoard(){
    return (
        <>
        <SkeletonHeader/>
        <SkeletonTripList/>
        </>
    )
}

export function SkeletonHeader() {
    return (
      <div role="status" className="space-y-3 animate-pulse">
        <div className="flex items-center w-full max-w-md">
          <div className="h-3 bg-muted rounded-full w-40" />
          <div className="h-3 ms-2 bg-muted rounded-full w-24" />
        </div>
  
        <div className="flex items-center w-full max-w-sm">
          <div className="h-3 bg-muted rounded-full w-32" />
          <div className="h-3 ms-2 bg-muted rounded-full flex-grow" />
          <div className="h-3 ms-2 bg-muted rounded-full w-20" />
        </div>
      </div>
    );
  }
  

export function SkeletonTripCard() {
  return (
    <div className="rounded-xl overflow-hidden border border-border shadow-sm p-0 animate-pulse bg-card">
      {/* Image area */}
      <div className="relative h-48 w-full">
        <div className="absolute inset-0 bg-muted" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/20 to-transparent" />
      </div>

      <div className="p-5 space-y-4">
        {/* Title and menu */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <div className="h-6 w-40 bg-muted rounded-md" />
            <div className="h-4 w-32 bg-muted rounded-md" />
          </div>

          <div className="h-8 w-8 bg-muted rounded-full" />
        </div>

        {/* Dates */}
        <div className="h-4 w-48 bg-muted rounded-md" />
      </div>
    </div>
  );
}

export function SkeletonTripList() {
  return (
    <div className="space-y-6">
      <SkeletonTripCard />
      <SkeletonTripCard />
      <SkeletonTripCard />
    </div>
  );
}
