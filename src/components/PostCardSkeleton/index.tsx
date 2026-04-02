import { Skeleton } from "../ui/skeleton";

const PostCardSkeleton = () => {
  return (
    <div className="rounded-2xl border bg-card overflow-hidden animate-in fade-in duration-300">
      <Skeleton className="h-[200px] w-full rounded-none" />

      <div className="p-5 space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-12 rounded-full" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-5 w-[90%]" />
          <Skeleton className="h-5 w-[70%]" />
        </div>

        <div className="space-y-1.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[60%]" />
        </div>

        <div className="flex items-center gap-3 pt-3 border-t border-border/50">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-2.5 w-28" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { PostCardSkeleton };
