import {
  FieldValues,
  Control,
  FieldErrors,
  ArrayPath,
  UseFormRegister
} from "react-hook-form";

interface MultipleInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: ArrayPath<T>;
  className?: string;
  formErrors?: FieldErrors<T>;
  label?: string;
  placeholder?: string;
  type?: "phone" | "email";
  register: UseFormRegister<T>;
}

export default MultipleInputFieldProps;
