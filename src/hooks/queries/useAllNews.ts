import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import { NewsEntity } from "@/common/entities/news";
import { getAllNews } from "@/store/services/news";
import {
  ONE_MINUTE_IN_MS,
  ONE_DAY_IN_MS
} from "@common/constants/generic";

export const getNewsQueryKey = () => {
  return ["news"];
};

export const getNewsQueryFn = () => {
  return () => getAllNews();
};

export const useGetAllNews = <T = NewsEntity[]>(
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getNewsQueryKey(),
    queryFn: getNewsQueryFn(),
    select,
    staleTime: ONE_MINUTE_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};
