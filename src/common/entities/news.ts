import { Timestamp } from "firebase/firestore";

export interface NewsEntity {
  id: string;
  title: string;
  imageUrl: string;
  text: string;
  link: string;
  target: string;
  createdAt: Timestamp;
}
