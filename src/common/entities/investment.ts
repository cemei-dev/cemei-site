import { Timestamp } from "firebase/firestore";

export interface InvestmentEntity {
  id: string;
  amount: string;
  timerange: string;
  year: string;
  category: string[];
  cityId: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
