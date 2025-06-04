import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import {
  FORTY_FIVE_MINUTES_IN_MS,
  ONE_DAY_IN_MS
} from "@/common/constants/generic";
import { VideoEntity } from "@/common/entities/vide";
import { getAllCityVideos } from "@/store/services/video";

export function getCityVideosQueryKey(cityId: string) {
  return ["videos", cityId];
}

export const getCityVideosQueryFn = (cityId: string) => {
  return () => getAllCityVideos(cityId);
};

export const useCityVideos = <T = VideoEntity[]>(
  cityId: string,
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getCityVideosQueryKey(cityId),
    queryFn: getCityVideosQueryFn(cityId),
    select,
    staleTime: FORTY_FIVE_MINUTES_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};
