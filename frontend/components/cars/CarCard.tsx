"use client";

import { Car } from "@/lib/services/carsApi";
import Image from "next/image";

interface CarCardProps {
  car: Car;
}

export function CarCard({ car }: CarCardProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md dark:shadow-slate-900/50 overflow-hidden hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-slate-900 transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {car.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{car.brand}</p>
        <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
          <div>
            <span className="font-medium">Year:</span> {car.year}
          </div>
          <div>
            <span className="font-medium">Fuel:</span> {car.fuel}
          </div>
          <div>
            <span className="font-medium">Transmission:</span>{" "}
            {car.transmission}
          </div>
          <div>
            <span className="font-medium">Seats:</span> {car.seats}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            ${car.pricePerDay}/day
          </span>
          <span className="text-sm text-yellow-500 dark:text-yellow-400">
            ★ {car.rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
