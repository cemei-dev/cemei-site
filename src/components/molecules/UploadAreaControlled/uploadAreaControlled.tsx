import { Controller, FieldValues } from "react-hook-form";

import FormErrorLabel from "@/components/atoms/FormError/formError";
import { cn } from "@/lib/utils";

import { ControlledUploadAreaProps } from "./types";

import { UploadArea } from "../UploadArea/uploadArea";

const UploadAreaControlled = <T extends FieldValues>({
  control,
  name,
  label,
  required,
  labelClassname,
  requiredVisual,
  formErrors,
  isEdit = false,
  acceptVideo = false,
  internalText,
  editFile,
  loading
}: ControlledUploadAreaProps<T>) => {
  const errorMessage = formErrors && name ? formErrors[name]?.message : null;
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "É necessário fazer o upload de um arquivo" }}
      render={({ field }) => (
        <div className="flex flex-col gap-2">
          {label && (
            <span className={cn("text-intense-purple", labelClassname)}>
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
          <UploadArea
            internalText={internalText}
            loading={loading}
            handleFileChange={(file: File) => {
              field.onChange(file);
            }}
            acceptedFileTypes={`image/png, image/jpeg, image/webp, ${acceptVideo && "video/mp4"}`}
            defaultFileName={isEdit ? editFile : undefined}
          />
          {errorMessage && (
            <FormErrorLabel>{errorMessage.toString()}</FormErrorLabel>
          )}
        </div>
      )}
    />
  );
};
export default UploadAreaControlled;
