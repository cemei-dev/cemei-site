export interface ConfirmModalProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
  description?: string;
  content?: string;
  actionLabel: string;
  action: () => void;
  loading?: boolean;
}
