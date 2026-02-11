"use client";

import { CarsGalleryInfinite } from "@/components/cars/CarsGalleryInfinite";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-8 transition-colors">
      <main className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Cars Gallery
          </h1>
          <ThemeToggle />
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search cars by name or brand..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
        </div>

        <CarsGalleryInfinite size={5} searchQuery={searchQuery} />
      </main>
    </div>
  );
}
