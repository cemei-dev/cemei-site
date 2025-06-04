import React from "react";

import { Control, FieldErrors, FieldValues, Path } from "react-hook-form";

export type ControlledUploadAreaProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  required?: boolean;
  requiredVisual?: boolean;
  labelClassname?: string;
  formErrors?: FieldErrors;
  isEdit?: boolean;
  acceptVideo?: boolean;
  internalText?: string;
  editFile?: File;
  loading?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;
