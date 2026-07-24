import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import { ONE_MINUTE_IN_MS, ONE_DAY_IN_MS } from "@/common/constants/generic";
import { ResultEntity } from "@/common/entities/result";
import { getActionResults } from "@/store/services/result";

export function getActionResultsQueryKey(actionId: string) {
  return ["results", actionId];
}

export const getActionResultsQueryFn = (actionId: string) => {
  return () => getActionResults(actionId);
};

export const useActionResults = <T = ResultEntity[]>(
  actionId: string,
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getActionResultsQueryKey(actionId),
    queryFn: getActionResultsQueryFn(actionId),
    select,
    staleTime: ONE_MINUTE_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};
