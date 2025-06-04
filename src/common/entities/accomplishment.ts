import { Timestamp } from "firebase/firestore";

export interface AccomplishmentEntity {
  id: string;
  title: string;
  text: string;
  imageUrl: string;
  cityId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
