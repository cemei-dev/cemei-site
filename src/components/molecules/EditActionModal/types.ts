import { ActionEntity } from "@/common/entities/action";

export interface EditActionModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  action: ActionEntity;
}
