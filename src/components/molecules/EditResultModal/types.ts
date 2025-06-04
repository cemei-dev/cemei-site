import { ResultEntity } from "@/common/entities/result";

export interface EditActionResultModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  result: ResultEntity;
}
