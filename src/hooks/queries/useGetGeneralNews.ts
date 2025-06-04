import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import {
  FORTY_FIVE_MINUTES_IN_MS,
  ONE_DAY_IN_MS
} from "@/common/constants/generic";
import { NewsEntity } from "@/common/entities/news";
import { getNewsByTarget } from "@/store/services/news";

export function getGeneralNewsQueryKey(target: string) {
  return ["generalNews", target];
}

export const getGeneralNewsQueryFn = (target: string) => {
  return () => getNewsByTarget(target);
};

export const useGetGeneralNews = <T = NewsEntity[]>(
  target: string,
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getGeneralNewsQueryKey(target),
    queryFn: getGeneralNewsQueryFn(target),
    select,
    staleTime: FORTY_FIVE_MINUTES_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};
