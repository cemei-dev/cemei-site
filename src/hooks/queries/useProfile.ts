import { useQuery } from "@tanstack/react-query";
import { DocumentData } from "firebase/firestore";

import { getUserDoc } from "@/store/services/user";
import { ONE_MINUTE_IN_MS, ONE_DAY_IN_MS } from "@common/constants/generic";
import type { UserEntity } from "@common/entities/user";

export function getProfileQueryKey(uid: string) {
  return ["profile", uid];
}

export const getProfileQueryFn = (uid: string) => {
  return () => getUserDoc(uid);
};

const useProfile = <T = UserEntity>(
  uid: string,
  select?: (data: DocumentData) => T
) => {
  return useQuery({
    queryKey: getProfileQueryKey(uid),
    queryFn: getProfileQueryFn(uid),
    select,
    staleTime: ONE_MINUTE_IN_MS,
    cacheTime: ONE_DAY_IN_MS
  });
};

export default useProfile;
