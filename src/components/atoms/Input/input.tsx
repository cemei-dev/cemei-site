import { FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";

import { InputProps } from "./types";

const Input = <T extends FieldValues>({
  register,
  name,
  className,
  suffix,
  inputPrefix,
  ...props
}: InputProps<T>) => {
  return (
    <div
      className={cn(
        "ring-offset-primary-50 focus-within:ring-primary-50 relative flex h-11 w-full items-center gap-1 rounded-[10px] border border-intense-purple px-3 text-base text-black outline-none",
        className
      )}
    >
      <div className="absolute left-5 top-1/2 z-10 -translate-y-1/2">
        {inputPrefix}
      </div>
      <input
        className={`${inputPrefix && "ml-10"} w-full border-intense-purple bg-inherit outline-none ring-0 ring-offset-0  placeholder:text-purple-200 ${props.readOnly && " text-search-gray"} `}
        {...props}
        {...(register && name ? register(name) : {})}
      />
      <div className="absolute right-5 top-1/2 z-10 -translate-y-1/2">
        {suffix}
      </div>
    </div>
  );
};

export default Input;
