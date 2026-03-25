import { Skeleton } from "../ui/skeleton";

const ResponsiveSkeletonCard = () => {
  return (
    <div className="w-full max-w-lg mx-auto my-4 p-4 rounded-[20px] border bg-card shadow-lg">
      <div className="flex gap-4 mb-4">
        <div className="flex-1 flex gap-4 items-center flex-wrap">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 text-left">
            <Skeleton className="h-5 w-full mb-2" />
            <Skeleton className="h-4 w-3/5" />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <Skeleton className="h-5 w-4/5" />
      </div>

      <Skeleton className="h-[200px] w-full mb-4" />

      <div className="mb-4">
        <Skeleton className="h-5 w-4/5 mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <div className="flex gap-2 w-full">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full mt-2" />
      </div>
    </div>
  );
};

export { ResponsiveSkeletonCard };
