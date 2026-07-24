import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import { ONE_MINUTE_IN_MS, ONE_DAY_IN_MS } from "@/common/constants/generic";
import { EducationalAxisEntity } from "@/common/entities/educationalAxis";
import { getAllEducationalAxis } from "@/store/services/educationalAxis";

export function getAllAxisQueryKey() {
  return ["educationalAxis"];
}

export const getAllAxisQueryFn = () => {
  return () => getAllEducationalAxis();
};

export const useAllAxis = <T = EducationalAxisEntity[]>(
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getAllAxisQueryKey(),
    queryFn: getAllAxisQueryFn(),
    select,
    staleTime: ONE_MINUTE_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};
