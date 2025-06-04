import { Timestamp } from "firebase/firestore";

export interface StrategyEntity {
  id: string;
  title: string;
  date: Timestamp;
  obs?: string;
  goalId: string;
  cityId: string;
}
