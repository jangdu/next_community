import React from 'react';

export default function SkeletonUi() {
  return (
    <div className="rounded-md p-4 w-full my-3 mx-auto">
      <div className="animate-pulse flex gap-2">
        <div className="rounded-full bg-slate-300 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-300 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-300 rounded col-span-2"></div>
              <div className="h-2 bg-slate-300 rounded col-span-1"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="animate-pulse w-full my-2 grid grid-cols-3 gap-4 py-2">
        <div className="h-2 bg-slate-300 rounded col-span-1"></div>
        <div className="h-2 bg-slate-300 rounded col-span-2"></div>
      </div>
      <div className="animate-pulse h-2 w-full bg-slate-300 rounded"></div>
    </div>
  );
}
