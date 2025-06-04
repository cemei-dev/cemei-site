export interface GoalEntity {
  id: string;
  text: string;
  educationalAxisId: string;
}

export type GoalDTO = Omit<GoalEntity, "id">;

export const nullGoalData: GoalDTO = {
  text: "",
  educationalAxisId: ""
};
