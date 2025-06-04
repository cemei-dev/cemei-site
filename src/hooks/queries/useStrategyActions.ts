import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import {
  FORTY_FIVE_MINUTES_IN_MS,
  ONE_DAY_IN_MS
} from "@/common/constants/generic";
import { ActionEntity } from "@/common/entities/action";
import { getStrategyActions } from "@/store/services/action";

export function getStrategyActionsQueryKey(strategyId: string) {
  return ["actions", strategyId];
}

export const getStrategyActionsQueryFn = (strategyId: string) => {
  return () => getStrategyActions(strategyId);
};

export const useStrategyActions = <T = ActionEntity[]>(
  strategyId: string,
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getStrategyActionsQueryKey(strategyId),
    queryFn: getStrategyActionsQueryFn(strategyId),
    select,
    staleTime: FORTY_FIVE_MINUTES_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};
