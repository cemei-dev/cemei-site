import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import { getAllCities } from "@/store/services/city";
import {
  FORTY_FIVE_MINUTES_IN_MS,
  ONE_DAY_IN_MS
} from "@common/constants/generic";
import type { CityEntity } from "@common/entities/city";

export const getCitiesQueryKey = () => {
  return ["cities"];
};

export const getCitiesQueryFn = () => {
  return () => getAllCities();
};

export const useGetAllCities = <T = CityEntity[]>(
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getCitiesQueryKey(),
    queryFn: getCitiesQueryFn(),
    select,
    staleTime: FORTY_FIVE_MINUTES_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};
