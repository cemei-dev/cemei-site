import React from "react";

import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

export type ControlledDatePickerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  requiredVisual?: boolean;
  labelClassname?: string;
  formErrors?: FieldErrors;
} & React.HTMLAttributes<HTMLDivElement>;
