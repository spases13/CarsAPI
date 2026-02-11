"use client";

import { useGetCarsQuery } from "@/lib/services/carsApi";
import { useEffect, useRef, useState } from "react";
import { CarCard } from "./CarCard";
import { CarCardSkeleton } from "./CarCardSkeleton";

interface CarsGalleryInfiniteProps {
  size?: number;
  searchQuery?: string;
}

export function CarsGalleryInfinite({
  size = 10,
  searchQuery,
}: CarsGalleryInfiniteProps) {
  const [page, setPage] = useState(1);
  const [allCars, setAllCars] = useState<any[]>([]);
  const touchRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadedPagesRef = useRef<Set<number>>(new Set());
  const carModelsRef = useRef<Set<string>>(new Set());

  const { data, isLoading } = useGetCarsQuery({ page, size, q: searchQuery });

  // Reset when search query changes
  useEffect(() => {
    setPage(1);
    setAllCars([]);
    loadedPagesRef.current.clear();
    carModelsRef.current.clear();
  }, [searchQuery]);

  // Update accumulated cars when new data arrives
  useEffect(() => {
    if (!data?.items || typeof data.page !== "number") {
      return;
    }

    if (loadedPagesRef.current.has(data.page)) {
      return;
    }

    loadedPagesRef.current.add(data.page);

    if (data.page === 1) {
      setAllCars(data.items);
      return;
    }

    setAllCars((prev) => {
      const existingIds = new Set(prev.map((car) => car.id));
      const newCars = data.items.filter((car) => !existingIds.has(car.id));
      return [...prev, ...newCars];
    });
  }, [data?.items, data?.page]);

  // Setup Intersection Observer for infinite scroll
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !isLoading && data) {
        const totalPages = Math.ceil(data.total / size);
        if (page < totalPages) {
          setPage((prev) => prev + 1);
        }
      }
    };

    observerRef.current = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    if (touchRef.current) {
      observerRef.current.observe(touchRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading, data, page, size]);

  const totalPages = data ? Math.ceil(data.total / size) : 1;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allCars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>

      {/* Loading skeletons at bottom */}
      {isLoading && allCars.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
          {Array.from({ length: size }).map((_, i) => (
            <CarCardSkeleton key={`skeleton-bottom-${page}-${i}`} />
          ))}
        </div>
      )}

      {/* Initial loading */}
      {isLoading && allCars.length === 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: size }).map((_, i) => (
            <CarCardSkeleton key={`skeleton-initial-${i}`} />
          ))}
        </div>
      )}

      {/* Intersection observer trigger point */}
      <div ref={touchRef} className="mt-8 h-10" />

      {/* End of results message */}
      {!isLoading && allCars.length > 0 && page >= totalPages && (
        <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
          All {allCars.length} cars loaded
        </div>
      )}

      {/* No results */}
      {!isLoading && allCars.length === 0 && (
        <div className="text-center mt-8 text-gray-600 dark:text-gray-400">
          No cars found
        </div>
      )}
    </div>
  );
}
