import { AccomplishmentEntity } from "@/common/entities/accomplishment";

export interface EditAccomplishmentModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  accomplishment: AccomplishmentEntity;
}
