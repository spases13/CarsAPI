"use client";

import { useGetCarsQuery } from "@/lib/services/carsApi";
import { CarCard } from "./CarCard";
import { CarCardSkeleton } from "./CarCardSkeleton";

interface CarsGalleryRTKProps {
  page?: number;
  size?: number;
  searchQuery?: string;
}

export function CarsGalleryRTK({
  page = 1,
  size = 5,
  searchQuery,
}: CarsGalleryRTKProps) {
  const { data, isLoading, error } = useGetCarsQuery({
    page,
    size,
    q: searchQuery,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: size }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {data?.items.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
