export const BlogSkeleton = () => {
  return (
    <div className="border-b-2 border-slate-300 pb-4 pt-2 cursor-pointer">
      <div className="flex">
        <div className="flex justify-center flex-col">
          <div className="h-2.5 bg-gray-200 rounded-full"></div>
        </div>
        <div className="font-medium px-1">
          <div className="h-2.5 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex justify-center flex-col px-1">
          <div className="h-2.5 bg-gray-200 rounded-full"></div>
        </div>
        <div className="font-light text-sm flex justify-center flex-col text-slate-800">
          <div className="h-2.5 bg-gray-200 rounded-full"></div>
        </div>
      </div>
      <div className="font-bold text-2xl pt-2">
        <div className="h-2.5 bg-gray-200 rounded-full"></div>
      </div>
      <div className="font-medium pt-1">
        <div className="h-2.5 bg-gray-200 rounded-full"></div>
      </div>
      <div className="text-slate-500 text-sm pt-4">
        <div className="h-2.5 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};
