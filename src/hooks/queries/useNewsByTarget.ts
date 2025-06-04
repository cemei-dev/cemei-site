import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import { NewsEntity } from "@/common/entities/news";
import { getNewsByTarget } from "@/store/services/news";
import {
  FORTY_FIVE_MINUTES_IN_MS,
  ONE_DAY_IN_MS
} from "@common/constants/generic";

export const getNewsByTargetQueryKey = (target: string) => {
  return ["news", target];
};

export const getNewsByTargetQueryFn = (target: string) => {
  return () => getNewsByTarget(target);
};

export const useGetNewsByTarget = <T = NewsEntity[]>(
  target: string,
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getNewsByTargetQueryKey(target),
    queryFn: getNewsByTargetQueryFn(target),
    select,
    staleTime: FORTY_FIVE_MINUTES_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};
