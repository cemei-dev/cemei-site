import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import { ActionEntity } from "@/common/entities/action";
import { getAction } from "@/store/services/action";
import {
  FORTY_FIVE_MINUTES_IN_MS,
  ONE_DAY_IN_MS
} from "@common/constants/generic";
export function getActionQueryKey(actionId: string) {
  return ["action", actionId];
}

export const getActionQueryFn = (actionId: string) => {
  return () => getAction(actionId);
};

const useAction = <T = ActionEntity>(
  actionId: string,
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getActionQueryKey(actionId),
    queryFn: getActionQueryFn(actionId),
    select,
    staleTime: FORTY_FIVE_MINUTES_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};

export default useAction;
