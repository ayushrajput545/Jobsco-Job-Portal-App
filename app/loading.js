import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen mb-[20vh] md:mb-0">
      <div className="flex gap-5 flex-col items-center space-y-3">
        {/* <Skeleton className='min-h-[630px] h-full w-full bg-zinc-500 mt-5'/> */}
        <span className="loader"></span>
        <p className="text-black text-xl font-bold">Loading, please wait...</p>
      </div>
    </div>
  );
}
