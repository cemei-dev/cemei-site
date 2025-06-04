import { Timestamp } from "firebase/firestore";

export interface VideoEntity {
  id: string;
  title: string;
  videoUrl: string;
  text: string;
  createdAt: Timestamp;
}
