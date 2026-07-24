import React from 'react';

export const LoadingSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs animate-pulse flex flex-col h-80"
        >
          {/* Skeleton Image */}
          <div className="w-full h-44 bg-slate-200 dark:bg-slate-800" />
          
          {/* Skeleton Body */}
          <div className="p-4 flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded-md w-3/4" />
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-full" />
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded-md w-2/3" />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/4" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-md w-1/4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
