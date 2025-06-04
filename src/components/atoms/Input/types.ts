import { ComponentProps } from "react";

import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface InputProps<T extends FieldValues>
  extends ComponentProps<"input"> {
  name?: Path<T>;
  register?: UseFormRegister<T>;
  suffix?: React.ReactNode;
  inputPrefix?: React.ReactNode;
}
