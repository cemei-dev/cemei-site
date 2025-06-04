import { HTMLProps } from "react";

import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

export interface MultiSelectFieldProps<T extends FieldValues> {
  label?: string;
  control: Control<T>;
  formErrors?: FieldErrors;
  className?: HTMLProps<HTMLElement>["className"];
  name: Path<T>;
  options: Array<{ label: string; value: string }>;
  placeholder?: string;
}
