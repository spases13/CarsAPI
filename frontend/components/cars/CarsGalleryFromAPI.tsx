"use client";

import { useState, useEffect } from "react";
import { CarCard } from "./CarCard";
import { CarCardSkeleton } from "./CarCardSkeleton";
import { Car } from "@/lib/services/carsApi";

interface CarsGalleryProps {
  page?: number;
  size?: number;
}

export function CarsGalleryFromAPI({ page = 1, size = 12 }: CarsGalleryProps) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:4000/api/cars?page=${page}&size=${size}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch cars");
        }
        const data = await response.json();
        setCars(data.items);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        setCars([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [page, size]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: size }).map((_, i) => (
          <CarCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
