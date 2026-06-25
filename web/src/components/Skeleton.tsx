"use client";

/**
 * Skeleton loading components for consistent loading states.
 */

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`bg-white/8 rounded-md animate-pulse ${className}`}
    />
  );
}

/** Square card skeleton — album / playlist / artist card */
export function CardSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-square w-full rounded-lg" />
      <Skeleton className="h-3.5 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </div>
  );
}

/** Track row skeleton */
export function TrackRowSkeleton() {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5">
      <Skeleton className="w-10 h-10 shrink-0 rounded-md" />
      <div className="flex-1 flex flex-col gap-2 min-w-0">
        <Skeleton className="h-3.5 w-40 max-w-full" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-3 w-10 shrink-0" />
    </div>
  );
}

/** Page header skeleton — artist/album hero */
export function HeroSkeleton() {
  return (
    <div className="flex items-end gap-6 p-8 pt-16">
      <Skeleton className="w-48 h-48 shrink-0 rounded-xl shadow-2xl" />
      <div className="flex flex-col gap-3 pb-2 flex-1 min-w-0">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-10 w-64 max-w-full" />
        <Skeleton className="h-3.5 w-48" />
      </div>
    </div>
  );
}

/** Grid of card skeletons */
export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

/** List of track skeletons */
export function TrackListSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="flex flex-col">
      {Array.from({ length: count }).map((_, i) => (
        <TrackRowSkeleton key={i} />
      ))}
    </div>
  );
}
