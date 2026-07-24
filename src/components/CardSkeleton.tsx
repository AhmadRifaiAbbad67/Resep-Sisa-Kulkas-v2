import React from 'react';

interface CardSkeletonProps {
  count?: number;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/15 animate-pulse flex flex-col h-full"
        >
          {/* Skeleton Image */}
          <div className="w-full aspect-16/10 bg-white/10" />

          {/* Skeleton Content */}
          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <div className="h-4 w-20 bg-white/15 rounded-lg" />
                <div className="h-4 w-16 bg-white/15 rounded-lg" />
              </div>

              {/* Title */}
              <div className="h-6 w-3/4 bg-white/20 rounded-xl" />
              <div className="h-4 w-full bg-white/10 rounded-lg" />
              <div className="h-4 w-2/3 bg-white/10 rounded-lg" />
            </div>

            {/* Footer Stats */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="h-4 w-16 bg-white/15 rounded-lg" />
              <div className="h-4 w-16 bg-white/15 rounded-lg" />
              <div className="h-4 w-16 bg-white/15 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
