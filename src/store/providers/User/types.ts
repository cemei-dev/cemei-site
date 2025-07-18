import { UserEntity } from "@/common/entities/user";

export interface UserContextType {
  updateUser: ({ uid, email, name }: Partial<UserEntity>) => void;
  allUsers?: UserEntity[] | null;
  loading: Record<string, boolean>;
  fetchAllUsers: () => void;
}
