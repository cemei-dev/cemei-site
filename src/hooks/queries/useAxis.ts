import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import { getEducationalAxisById } from "@/store/services/educationalAxis";
import {
  FORTY_FIVE_MINUTES_IN_MS,
  ONE_DAY_IN_MS
} from "@common/constants/generic";
import { EducationalAxisEntity } from "@common/entities/educationalAxis";
export function getAxisQueryKey(axisId: string) {
  return ["axis", axisId];
}

export const getAxisQueryFn = (axisId: string) => {
  return () => getEducationalAxisById(axisId);
};

const useAxis = <T = EducationalAxisEntity>(
  axisId: string,
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getAxisQueryKey(axisId),
    queryFn: getAxisQueryFn(axisId),
    select,
    staleTime: FORTY_FIVE_MINUTES_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};

export default useAxis;
