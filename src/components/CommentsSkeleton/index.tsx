import { Skeleton } from "../ui/skeleton";

export const CommentsSkeleton = () => {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex items-center gap-3">
        <Skeleton className="h-6 w-6 rounded" />
        <Skeleton className="h-7 w-36 rounded" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-28 w-full rounded-xl" />
        <div className="flex justify-end">
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>

      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-4 p-5 rounded-xl bg-muted/30">
            <div className="flex items-center gap-3">
              <Skeleton className="h-11 w-11 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-3 w-20 rounded" />
              </div>
            </div>
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-4/5 rounded" />
            <div className="flex gap-4 pt-1">
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-20 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
