import { GoalEntity } from "@/common/entities/goal";

export interface EditGoalModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  goal: GoalEntity;
}
