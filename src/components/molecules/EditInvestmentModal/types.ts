import { InvestmentEntity } from "@/common/entities/investment";

export interface EditInvestmentModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  investment: InvestmentEntity;
}
