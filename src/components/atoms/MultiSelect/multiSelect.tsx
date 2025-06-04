"use client";

import React, { ComponentProps, Dispatch, SetStateAction } from "react";

import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import Button from "../Button/button";

type Option = { label: string; value: string };

interface MultiSelectProps {
  placeholder: string;
  options: Option[];
  selectedOptions: string[];
  setSelectedOptions: Dispatch<SetStateAction<string[]>>;
  className?: ComponentProps<"div">["className"];
}

export const MultiSelect = ({
  placeholder,
  options,
  className,
  selectedOptions = [], // Garantir que seja um array
  setSelectedOptions
}: MultiSelectProps) => {
  const [open, setOpen] = React.useState(false);

  const handleSelectChange = (value: string) => {
    setSelectedOptions((prev) => {
      const prevArray = Array.isArray(prev) ? prev : [];
      const newArray = prevArray.includes(value)
        ? prevArray.filter((item) => item !== value)
        : [...prevArray, value];

      return newArray; // Agora sempre retorna um array válido
    });
  };

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          aria-expanded={open}
          className={cn(
            "w-full items-center justify-between text-lg font-normal",
            className
          )}
        >
          <span>
            {selectedOptions.length > 0
              ? `${selectedOptions.length} selecionado(s)`
              : placeholder}
          </span>
          <ChevronDown
            className={cn("h-5 w-5", open ? "rotate-180" : "rotate-0")}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={selectedOptions.includes(option.value)}
            onCheckedChange={() => handleSelectChange(option.value)}
            className="text-lg text-intense-purple"
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
