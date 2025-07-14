export default function BookSkeleton() {
  return (
    <div className="flex flex-row items-center w-119 bg-neutral-600 dark:bg-neutral-300 text-neutral-800 h-20 m-1 p-4 rounded-tr-4xl rounded-bl-4xl space-x-2 animate-pulse">
      <div className="w-6 h-6 bg-neutral-500 dark:bg-neutral-400 rounded-full mr-3" />
      <div className="flex flex-col justify-center w-full space-y-1">
        <div className="flex flex-row justify-between items-center">
          <div className="h-4 w-32 bg-neutral-500 dark:bg-neutral-400 rounded-md" />
          <div className="h-4 w-24 bg-neutral-500 dark:bg-neutral-400 rounded-md mr-2" />
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="h-3 w-40 bg-neutral-500 dark:bg-neutral-400 rounded-md" />
          <div className="flex flex-row gap-2">
            <div className="h-4 w-20 bg-neutral-500 dark:bg-neutral-400 rounded-md" />
            <div className="h-5 w-5 bg-neutral-500 dark:bg-neutral-400 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}