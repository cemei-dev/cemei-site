import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import { getInvestmentsByCity } from "@/store/services/investment";
import {
  FORTY_FIVE_MINUTES_IN_MS,
  ONE_DAY_IN_MS
} from "@common/constants/generic";
import type { InvestmentEntity } from "@common/entities/investment";

export function getInvestmentsQueryKey(cityId: string) {
  return ["investments", cityId];
}

export const getInvestmentsQueryFn = (cityId: string) => {
  return () => getInvestmentsByCity(cityId);
};

const useGetInvestmentsByCity = <T = InvestmentEntity[]>(
  cityId: string,
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getInvestmentsQueryKey(cityId),
    queryFn: getInvestmentsQueryFn(cityId),
    select,
    staleTime: FORTY_FIVE_MINUTES_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};

export default useGetInvestmentsByCity;
