import { Timestamp } from "firebase/firestore";

export interface EventEntity {
  id: string;
  title: string;
  imageUrl: string;
  text: string;
  target: string;
  initialDate: Timestamp;
  endDate: Timestamp;
  place: string;
  link: string;
}
