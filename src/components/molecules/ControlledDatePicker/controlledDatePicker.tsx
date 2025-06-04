import { Controller, FieldValues } from "react-hook-form";

import FormErrorLabel from "@/components/atoms/FormError/formError";
import { cn } from "@/lib/utils";

import { ControlledDatePickerProps } from "./types";

const ControlledDatePicker = <T extends FieldValues>({
  control,
  name,
  label,
  required,
  labelClassname,
  requiredVisual,
  className,
  formErrors
}: ControlledDatePickerProps<T>) => {
  const errorMessage = formErrors && name ? formErrors[name]?.message : null;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <div className="flex flex-col gap-2">
            {label && (
              <span
                className={cn(
                  "text-label-blue text-sm font-medium",
                  labelClassname
                )}
              >
                {label}
                {required && requiredVisual && (
                  <span className="font-bold">*</span>
                )}
                {!required && !requiredVisual && (
                  <span className="ml-1 font-normal italic text-gray-500">
                    {" "}
                    (opcional){" "}
                  </span>
                )}
              </span>
            )}{" "}
            {/* <DatePicker date={value} setDate={onChange} /> */}
            <input
              type="date"
              value={value}
              onChange={onChange}
              className={cn(
                "ring-offset-primary-50 focus-within:border-primary-300 focus-within:ring-primary-50 border-input-color text-pure-black relative flex h-11 w-full items-center gap-1 rounded-lg border px-3 text-base outline-none focus-within:ring-1 focus-within:ring-offset-2",
                className
              )}
              min="1900-01-01"
              max="2099-12-31"
            />
            {errorMessage && (
              <FormErrorLabel>{errorMessage.toString()}</FormErrorLabel>
            )}
          </div>
        );
      }}
    />
  );
};

export default ControlledDatePicker;
