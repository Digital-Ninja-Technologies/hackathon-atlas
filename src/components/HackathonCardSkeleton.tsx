import { Skeleton } from "@/components/ui/skeleton";

export function HackathonCardSkeleton() {
  return (
    <div
      className="flex flex-col rounded-2xl border bg-card p-6"
      style={{ boxShadow: "var(--shadow-soft)" }}
    >
      <Skeleton className="h-3 w-24" />
      <Skeleton className="mt-4 h-6 w-3/4" />
      <Skeleton className="mt-2 h-4 w-full" />
      <Skeleton className="mt-1.5 h-4 w-5/6" />
      <div className="mt-5 grid grid-cols-2 gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
      <div className="mt-5 flex gap-1.5">
        <Skeleton className="h-5 w-14 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>
      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-7 w-24" />
      </div>
    </div>
  );
}
