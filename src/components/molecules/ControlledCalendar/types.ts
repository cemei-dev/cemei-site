import React from "react";

import {
  Control,
  FieldErrors,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue
} from "react-hook-form";

export type ControlledCalendarProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  register: UseFormRegister<T>;
  formErrors?: FieldErrors<T>;
  setValue: UseFormSetValue<T>;
  className?: string;
  watch: UseFormWatch<T>;
} & React.HTMLAttributes<HTMLDivElement>;
