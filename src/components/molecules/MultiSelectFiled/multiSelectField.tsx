"use client";

import { Controller, FieldValues } from "react-hook-form";

import FormErrorLabel from "@/components/atoms/FormError/formError";
import Label from "@/components/atoms/Label/label";
import { MultiSelect } from "@/components/atoms/MultiSelect/multiSelect";
import { cn } from "@/lib/utils";

import { MultiSelectFieldProps } from "./types";

const MultiSelectField = <T extends FieldValues>({
  label,
  control,
  name,
  className,
  formErrors,
  options,
  placeholder
}: MultiSelectFieldProps<T>) => {
  const errorMessage = (formErrors && formErrors[name]?.message) ?? null;

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {label && <Label>{label}</Label>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <MultiSelect
              placeholder={placeholder || "Selecione..."}
              options={options}
              selectedOptions={Array.isArray(field.value) ? field.value : []}
              setSelectedOptions={(newSelectedOptions) => {
                if (typeof newSelectedOptions === "function") {
                  const resolvedValue = newSelectedOptions(field.value || []);
                  field.onChange(
                    Array.isArray(resolvedValue) ? resolvedValue : []
                  );
                } else {
                  field.onChange(
                    Array.isArray(newSelectedOptions) ? newSelectedOptions : []
                  );
                }
              }}
            />
          );
        }}
      />
      {errorMessage && (
        <FormErrorLabel>{errorMessage.toString()}</FormErrorLabel>
      )}
    </div>
  );
};

export default MultiSelectField;
