import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import {
  FORTY_FIVE_MINUTES_IN_MS,
  ONE_DAY_IN_MS
} from "@/common/constants/generic";
import { ResultEntity } from "@/common/entities/result";
import { getGoalResults } from "@/store/services/result";

export function getGoalResultsQueryKey(goalId: string) {
  return ["results", goalId];
}

export const getGoalResultsQueryFn = (goalId: string) => {
  return () => getGoalResults(goalId);
};

export const useGoalResults = <T = ResultEntity[]>(
  goalId: string,
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getGoalResultsQueryKey(goalId),
    queryFn: getGoalResultsQueryFn(goalId),
    select,
    staleTime: FORTY_FIVE_MINUTES_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};
