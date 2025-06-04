import { Plus, Trash } from "lucide-react";
import {
  Controller,
  FieldValues,
  useFieldArray,
  ArrayPath,
  Path
} from "react-hook-form";

import FormErrorLabel from "@/components/atoms/FormError/formError";

import MultipleInputFieldProps from "./types";

import InputField from "../InputField/inputField";

const MultipleInputField = <T extends FieldValues>({
  control,
  name,
  type,
  register,
  placeholder,
  formErrors,
  label,
  ...props
}: MultipleInputFieldProps<T>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name as ArrayPath<T>
  });

  const errorMessage = formErrors && name ? formErrors[name]?.message : null;

  return (
    <div className="flex w-full flex-col gap-2">
      {label && <span className="text-intense-purple">{label}</span>}

      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex w-full items-start gap-2">
            <div className="flex-1">
              <Controller
                control={control}
                name={`${name}.${index}` as Path<T>}
                render={({ field: controllerField }) => (
                  <InputField
                    register={register}
                    {...props}
                    {...controllerField}
                    mask={type === "phone" ? "(99) 99999-9999" : undefined}
                    className="w-full"
                    placeholder={placeholder}
                  />
                )}
              />
            </div>
            {fields.length > 1 && (
              <div
                onClick={() => remove(index)}
                className="mt-1 flex h-9 w-9 transform cursor-pointer items-center justify-center rounded-full bg-intense-purple transition-all duration-300 hover:bg-[#6435AB]"
              >
                <Trash className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {fields.length < 3 && (
        <div
          onClick={() => append("" as unknown as T[ArrayPath<T>][number])}
          className="flex w-max transform cursor-pointer items-start gap-1 place-self-end rounded-xl px-2 py-1 transition-all duration-300 hover:bg-gray-200"
        >
          <Plus className="h-5 w-5" color="#8951CF" />
          <p className="text-intense-purple">
            Adicionar {type === "phone" ? "telefone" : "email"}
          </p>
        </div>
      )}

      {errorMessage && (
        <FormErrorLabel>
          {errorMessage && errorMessage.toString()}
        </FormErrorLabel>
      )}
    </div>
  );
};

export default MultipleInputField;
