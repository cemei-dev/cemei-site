import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import { AccomplishmentEntity } from "@/common/entities/accomplishment";
import { getAllAccomplishment } from "@/store/services/accomplishment";
import {
  FORTY_FIVE_MINUTES_IN_MS,
  ONE_DAY_IN_MS
} from "@common/constants/generic";

export const getAccomplishmentQueryKey = () => {
  return ["accomplishment"];
};

export const getAccomplishmentQueryFn = () => {
  return () => getAllAccomplishment();
};

export const useGetAllAccomplishment = <T = AccomplishmentEntity[]>(
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getAccomplishmentQueryKey(),
    queryFn: getAccomplishmentQueryFn(),
    select,
    staleTime: FORTY_FIVE_MINUTES_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};
