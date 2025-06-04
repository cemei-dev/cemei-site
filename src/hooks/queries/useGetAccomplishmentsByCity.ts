import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import { AccomplishmentEntity } from "@/common/entities/accomplishment";
import { getAccomplishmentsByCity } from "@/store/services/accomplishment";
import {
  FORTY_FIVE_MINUTES_IN_MS,
  ONE_DAY_IN_MS
} from "@common/constants/generic";

export function getAccomplishmentQueryKey(cityId: string) {
  return ["accomplishments", cityId];
}

export const getAccomplishmentQueryFn = (cityId: string) => {
  return () => getAccomplishmentsByCity(cityId);
};

const useGetAccomplishmentByCity = <T = AccomplishmentEntity[]>(
  cityId: string,
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getAccomplishmentQueryKey(cityId),
    queryFn: getAccomplishmentQueryFn(cityId),
    select,
    staleTime: FORTY_FIVE_MINUTES_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};

export default useGetAccomplishmentByCity;
