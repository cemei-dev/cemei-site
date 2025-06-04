import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import { getCityById } from "@/store/services/city";
import {
  FORTY_FIVE_MINUTES_IN_MS,
  ONE_DAY_IN_MS
} from "@common/constants/generic";
import type { CityEntity } from "@common/entities/city";

export function getCityQueryKey(cityId: string) {
  return ["city", cityId];
}

export const getCityQueryFn = (cityId: string) => {
  return () => getCityById(cityId);
};

const useGetCityById = <T = CityEntity>(
  cityId: string,
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getCityQueryKey(cityId),
    queryFn: getCityQueryFn(cityId),
    select,
    staleTime: FORTY_FIVE_MINUTES_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};

export default useGetCityById;
