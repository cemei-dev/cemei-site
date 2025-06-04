"use client";

import { useState } from "react";

import { ArrowRight, ArrowDown, ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { CityEntity } from "@/common/entities/city";
import { useGetAllCities } from "@/hooks/queries/useGetAllCities";

interface CityCardProps {
  city: CityEntity;
}

function CityCard({ city }: CityCardProps) {
  return (
    <Link
      href={`/${city.id}`}
      className="flex w-full cursor-pointer items-center justify-between rounded-[32px] border border-purple-1000 px-6 py-4 transition-all duration-300 hover:scale-105 hover:bg-purple-100"
    >
      <div className="flex items-center gap-4">
        <div className="relative h-[76px] w-[76px] overflow-hidden border">
          <Image src={city.cityImageUrl} alt={city.name} fill priority />
        </div>
        <span className="text-lg font-medium text-intense-purple">
          {city.name}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-lg font-normal text-intense-purple">
          Descubra
        </span>
        <ArrowRight className="h-5 w-5 text-intense-purple" />
      </div>
    </Link>
  );
}

export default function CityList() {
  const { data: cities = [] } = useGetAllCities();
  const [startIndex, setStartIndex] = useState(0);
  const citiesPerPage = 3;

  const visibleCities = cities?.length
    ? cities.slice(
        startIndex,
        Math.min(startIndex + citiesPerPage, cities.length)
      )
    : [];

  const handleNext = () => {
    if (startIndex + citiesPerPage < cities.length) {
      setStartIndex(startIndex + citiesPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - citiesPerPage);
    }
  };

  return (
    <>
      {cities?.length ? (
        <div className="flex w-full flex-col items-center gap-4">
          {startIndex > 0 && (
            <button
              onClick={handlePrev}
              className="flex items-center justify-center rounded-full bg-purple-500 p-2 text-white hover:scale-110"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          )}

          <div className="flex w-full flex-col gap-4">
            {visibleCities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>

          {startIndex + citiesPerPage < cities.length && (
            <button
              onClick={handleNext}
              className="flex items-center justify-center rounded-full bg-purple-500 p-2 text-white hover:scale-110"
            >
              <ArrowDown className="h-5 w-5" />
            </button>
          )}
        </div>
      ) : (
        <div className="mt-20 items-center justify-center">
          <p className="text-center text-2xl font-extrabold">
            Nenhuma cidade cadastrada
          </p>
        </div>
      )}
    </>
  );
}
