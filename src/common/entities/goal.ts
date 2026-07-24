export interface GoalEntity {
  id: string;
  text: string;
  educationalAxisId: string;
  // ponytail: optional so goals created before this field (and admin/PNE goals) still fall back to positional numbering
  number?: number;
}

export type GoalDTO = Omit<GoalEntity, "id">;

export const nullGoalData: GoalDTO = {
  text: "",
  educationalAxisId: ""
};
