import { StrategyEntity } from "@/common/entities/strategy";

export interface EditStrategyModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  strategy: StrategyEntity;
}
