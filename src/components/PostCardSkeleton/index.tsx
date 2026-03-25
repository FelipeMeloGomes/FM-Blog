import { Skeleton } from "../ui/skeleton";

const PostCardSkeleton = () => {
  return (
    <div className="border rounded-md overflow-hidden">
      <div className="aspect-video">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="p-5 space-y-3">
        <div className="flex gap-2">
          <Skeleton className="h-4 w-[60px]" />
          <Skeleton className="h-4 w-[40px]" />
        </div>

        <Skeleton className="h-6 w-[90%]" />
        <Skeleton className="h-6 w-[70%]" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[60%]" />
        </div>

        <hr className="my-2" />

        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-3 w-[80px]" />
          </div>
          <Skeleton className="h-3 w-[60px]" />
        </div>
      </div>
    </div>
  );
};

export { PostCardSkeleton };
