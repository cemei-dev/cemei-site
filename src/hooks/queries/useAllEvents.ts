import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import { EventEntity } from "@/common/entities/event";
import { getAllEvents } from "@/store/services/event";
import {
  FORTY_FIVE_MINUTES_IN_MS,
  ONE_DAY_IN_MS
} from "@common/constants/generic";

export const getEventsQueryKey = () => {
  return ["events"];
};

export const getEventsQueryFn = () => {
  return () => getAllEvents();
};

export const useGetAllEvents = <T = EventEntity[]>(
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getEventsQueryKey(),
    queryFn: getEventsQueryFn(),
    select,
    staleTime: FORTY_FIVE_MINUTES_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};
