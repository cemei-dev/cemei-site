import { Timestamp } from "firebase/firestore";

export interface ActionEntity {
  id: string;
  strategyId: string;
  title: string;
  date: Timestamp;
  status: string;
  needMoney: boolean;
  obs?: string;
  educationalAxisId: string;
  goalId: string;
  cityId: string;
}

export type ActionDTO = Omit<ActionEntity, "id">;

export const nullActionData: ActionDTO = {
  strategyId: "",
  title: "",
  date: Timestamp.now(),
  status: "",
  needMoney: false,
  obs: "",
  educationalAxisId: "",
  goalId: "",
  cityId: ""
};
