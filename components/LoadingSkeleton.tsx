import React from 'react';
import { cn } from './ui/shadcn';

interface LoadingSkeletonProps {
  count?: number;
  className?: string;
  height?: string;
  layout?: 'grid' | 'list';
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  count = 1, 
  className, 
  height = 'h-24',
  layout = 'list'
}) => {
  return (
    <div className={cn(
      layout === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4",
      "w-full"
    )}>
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className={cn(
            "bg-slate-100 animate-pulse rounded-xl",
            height,
            className
          )}
        />
      ))}
    </div>
  );
};

export default LoadingSkeleton;
