"use client";

export function CarCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-slate-900/50 overflow-hidden animate-pulse">
      <div className="h-48 w-full bg-gray-200 dark:bg-slate-700" />
      <div className="p-4">
        <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-4" />
        <div className="grid grid-cols-2 gap-2">
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded" />
        </div>
        <div className="mt-4 h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/2" />
      </div>
    </div>
  );
}
