import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Car {
  id: number;
  name: string;
  brand: string;
  brandLogo?: string;
  year: number;
  pricePerDay: number;
  fuel: string;
  transmission: string;
  seats: number;
  rating: number;
  image: string;
}

export interface CarsResponse {
  page: number;
  size: number;
  total: number;
  items: Car[];
}

export interface CarsQueryParams {
  page?: number;
  size?: number;
  q?: string;
}

const baseUrl =
  process.env.NEXT_PUBLIC_CARS_API_BASE_URL || "http://localhost:4000/api";

export const carsApi = createApi({
  reducerPath: "carsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCars: builder.query<CarsResponse, CarsQueryParams>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params.page) searchParams.append("page", params.page.toString());
        if (params.size) searchParams.append("size", params.size.toString());
        if (params.q) searchParams.append("q", params.q);

        return `/cars?${searchParams.toString()}`;
      },
    }),
  }),
});

export const { useGetCarsQuery } = carsApi;
