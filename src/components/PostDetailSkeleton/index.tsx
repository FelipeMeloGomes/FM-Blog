import { Skeleton } from "../ui/skeleton";

const PostDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-8 animate-pulse">
      <div className="flex gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-20 rounded-full" />
      </div>

      <Skeleton className="h-12 w-full rounded-xl" />
      <Skeleton className="h-12 w-4/5 rounded-xl" />

      <div className="flex gap-4 mt-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-[150px] rounded" />
          <Skeleton className="h-3 w-[100px] rounded" />
        </div>
      </div>

      <Skeleton className="h-[400px] rounded-2xl mt-4" />

      <div className="flex flex-col gap-4 mt-6">
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-full rounded" />
        <Skeleton className="h-5 w-3/5 rounded" />
      </div>
    </div>
  );
};

export { PostDetailSkeleton };
