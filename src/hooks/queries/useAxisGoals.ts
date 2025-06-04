import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import {
  FORTY_FIVE_MINUTES_IN_MS,
  ONE_DAY_IN_MS
} from "@/common/constants/generic";
import { GoalEntity } from "@/common/entities/goal";
import { getAxisGoals } from "@/store/services/goal";

export function getAxisGoalsQueryKey(axisId: string) {
  return ["goals", axisId];
}

export const getAxisGoalsQueryFn = (axisId: string) => {
  return () => getAxisGoals(axisId);
};

export const useAxisGoals = <T = GoalEntity[]>(
  axisId: string,
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getAxisGoalsQueryKey(axisId),
    queryFn: getAxisGoalsQueryFn(axisId),
    select,
    staleTime: FORTY_FIVE_MINUTES_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};
