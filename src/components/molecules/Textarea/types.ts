import { ComponentProps } from "react";

import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface TextAreaProps<T extends FieldValues>
  extends ComponentProps<"textarea"> {
  name?: Path<T>;
  register?: UseFormRegister<T>;
  placeholder?: string;
}
