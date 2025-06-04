import { forwardRef } from "react";

import { Slot } from "@radix-ui/react-slot";
import { tv } from "tailwind-variants";

import { cn } from "@/lib/utils";

import { ButtonProps, Ref } from "./types";

import LoadingComponent from "../Loading/loading";

export const buttonVariants = tv({
  base: "rounded-2xl outline-none flex flex-row items-center justify-center gap-3 transition-colors cursor-pointer border disabled:cursor-not-allowed font-corisande",
  variants: {
    size: {
      sm: "py-2 px-4 text-sm",
      md: "h-11 px-5 text-sm",
      lg: "py-2.5 px-6 text-base",
      xl: "py-3 px-7 text-base",
      xxl: "py-4 px-8 text-lg"
    },
    variant: {
      success:
        "bg-intense-purple rounded-2xl px-9 hover:bg-[#6435AB] text-lg text-white disabled:bg-gray-300 active:bg-primary-600 border-primary-600 hover:border-primary-700",
      "secondary-gray":
        "border-gray-300 bg-base-white hover:bg-gray-50 text-lg disabled:bg-gray-50 disabled:border-gray-200 text-gray-700 disabled:text-gray-300",
      "secondary-purple":
        "border-intense-purple bg-white px-9 hover:bg-purple-100 text-lg disabled:bg-gray-50 disabled:border-gray-200 text-intense-purple disabled:text-gray-300",
      "secondary-color":
        "bg-primary-50 border-primary-700 hover:bg-primary-100 text-lg hover:border-primary-100 disabled:bg-primary-25 disabled:border-primary-25 text-primary-800 disabled:text-primary-300",
      "tertiary-gray":
        "bg-transparent border-transparent hover:bg-gray-50 text-lg text-gray-600 disabled:text-gray-300",
      "tertiary-color":
        "bg-transparent border-transparent hover:bg-primary-50 text-lg text-primary-700 disabled:text-gray-300",
      destructive:
        "bg-error-600 border-error-600 hover:border-bg-error-700 text-lg hover:bg-error-700 disabled:bg-error-200 disabled:border-error-200 text-base-white disabled:text-base-white"
    }
  },
  defaultVariants: {
    size: "sm",
    variant: "success"
  }
});

const Button = forwardRef<Ref, ButtonProps>(
  (
    {
      loading = false,
      disabled,
      className,
      size,
      variant = "success",
      asChild = false,
      prefix,
      suffix,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const loadingVariant = {
      "secondary-color": "text-primary-600",
      "secondary-gray": "text-gray-800",
      "secondary-purple": "text-intense-purple",
      success: "text-base-white",
      destructive: "text-base-white",
      "tertiary-color": "text-base-white",
      "tertiary-gray": "text-base-white"
    } as const;

    if (loading) {
      return (
        <Comp
          className={buttonVariants({
            className,
            size,
            variant
          })}
          ref={ref}
          disabled={true}
        >
          <LoadingComponent
            className={cn("h-4 w-4", loadingVariant[variant])}
          />
        </Comp>
      );
    }

    return (
      <Comp
        disabled={disabled}
        className={buttonVariants({
          className,
          size,
          variant
        })}
        ref={ref}
        {...props}
      >
        {prefix && <span className="flex items-center">{prefix}</span>}
        {children}
        {suffix && <span className="flex items-center">{suffix}</span>}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export default Button;
