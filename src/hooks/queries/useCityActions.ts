import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import {
  FORTY_FIVE_MINUTES_IN_MS,
  ONE_DAY_IN_MS
} from "@/common/constants/generic";
import { ActionEntity } from "@/common/entities/action";
import { getCityActions } from "@/store/services/action";

export function getCityActionsQueryKey(cityId: string) {
  return ["actions", cityId];
}

export const getCityActionsQueryFn = (cityId: string) => {
  return () => getCityActions(cityId);
};

export const useCityActions = <T = ActionEntity[]>(
  cityId: string,
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getCityActionsQueryKey(cityId),
    queryFn: getCityActionsQueryFn(cityId),
    select,
    staleTime: FORTY_FIVE_MINUTES_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};
