import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import {
  FORTY_FIVE_MINUTES_IN_MS,
  ONE_DAY_IN_MS
} from "@/common/constants/generic";
import { EventEntity } from "@/common/entities/event";
import { getEventsByTarget } from "@/store/services/event";

export function getEventQueryKey(target: string) {
  return ["events", target];
}

export const getEventQueryFn = (target: string) => {
  return () => getEventsByTarget(target);
};

const useGetEventByTarget = <T = EventEntity[]>(
  target: string,
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getEventQueryKey(target),
    queryFn: getEventQueryFn(target),
    select,
    staleTime: FORTY_FIVE_MINUTES_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};

export default useGetEventByTarget;
