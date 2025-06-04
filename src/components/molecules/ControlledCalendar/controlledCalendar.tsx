import { useState, useEffect, useRef } from "react";

import { FieldValues, Path } from "react-hook-form";

import { Calendar } from "@/components/ui/calendar";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

import { ControlledCalendarProps } from "./types";

import InputField from "../InputField/inputField";

const ControlledCalendar = <T extends FieldValues>({
  name,
  label,
  control,
  setValue,
  watch,
  className,
  register,
  formErrors
}: ControlledCalendarProps<T>) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const dateValue = watch(name as Path<T>);
  const [date, setDate] = useState<Date | undefined>(
    dateValue ? new Date(dateValue as string) : undefined
  );

  // Fechar ao clicar fora
  useOnClickOutside(calendarRef, () => setIsCalendarOpen(false));

  // Sincronizar com react-hook-form
  useEffect(() => {
    if (date) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setValue(name as Path<T>, date as any, { shouldValidate: true });
    }
  }, [date, name, setValue]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setIsCalendarOpen(false);
  };

  return (
    <div className="relative flex flex-col gap-2">
      <InputField
        control={control}
        name={name}
        register={register}
        label={label}
        value={date ? date.toLocaleDateString("pt-BR") : ""}
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        readOnly
        aria-haspopup="dialog"
        className={className}
        aria-expanded={isCalendarOpen}
        formErrors={formErrors}
      />
      {isCalendarOpen && (
        <div ref={calendarRef} className="absolute top-full z-50 mt-1">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="w-max rounded-md border bg-background shadow-md"
            initialFocus
          />
        </div>
      )}
    </div>
  );
};

export default ControlledCalendar;
