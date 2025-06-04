"use client";

import * as React from "react";

import { Check, ChevronDown } from "lucide-react";

import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { SelectProps } from "./types";

import Button from "../Button/button";

const Select = ({
  options,
  className,
  placeholder = "Procure...",
  onChange,
  value
}: SelectProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full items-center justify-between text-lg font-normal",
            className
          )}
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}

          <ChevronDown
            className={cn("h-5 w-5", open ? "rotate-180" : "rotate-0")}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[fit-content] p-0">
        <Command>
          <CommandGroup>
            {options.map((option) => (
              <CommandItem
                className="text-lg text-intense-purple"
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  if (onChange) {
                    onChange(currentValue === value ? "" : option.value);
                  }
                  setOpen(false);
                }}
              >
                {option.label}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Select;
