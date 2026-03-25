import { Skeleton } from "../ui/skeleton";

const PostDetailSkeleton = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-15" />
      </div>

      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-4/5" />

      <div className="flex gap-4 mt-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3.5 w-[150px]" />
          <Skeleton className="h-3 w-[100px]" />
        </div>
      </div>

      <Skeleton className="h-[400px] rounded-md mt-6" />

      <div className="flex flex-col gap-4 mt-8">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/5" />
      </div>
    </div>
  );
};

export { PostDetailSkeleton };
