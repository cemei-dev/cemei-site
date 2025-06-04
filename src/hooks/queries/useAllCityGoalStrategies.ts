import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import {
  FORTY_FIVE_MINUTES_IN_MS,
  ONE_DAY_IN_MS
} from "@/common/constants/generic";
import { StrategyEntity } from "@/common/entities/strategy";
import { getCityGoalStrategies } from "@/store/services/strategy";

export function getAllCityGoalStrategiesQueryKey(
  cityId: string,
  goalId: string
) {
  return ["strategies", cityId, goalId];
}

export const getCityGoalStrategiesQueryFn = (
  cityId: string,
  goalId: string
) => {
  return () => getCityGoalStrategies(cityId, goalId);
};

export const useCityGoalStrategies = <T = StrategyEntity[]>(
  cityId: string,
  goalId: string,
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getAllCityGoalStrategiesQueryKey(cityId, goalId),
    queryFn: getCityGoalStrategiesQueryFn(cityId, goalId),
    select,
    staleTime: FORTY_FIVE_MINUTES_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};
