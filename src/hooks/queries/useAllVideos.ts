import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import { VideoEntity } from "@/common/entities/vide";
import { getAllVideos } from "@/store/services/video";
import { ONE_MINUTE_IN_MS, ONE_DAY_IN_MS } from "@common/constants/generic";

export const getVideosQueryKey = () => {
  return ["videos"];
};

export const getVideosQueryFn = () => {
  return () => getAllVideos();
};

export const useGetAllVideos = <T = VideoEntity[]>(
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getVideosQueryKey(),
    queryFn: getVideosQueryFn(),
    select,
    staleTime: ONE_MINUTE_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};
