import { LabelProps } from "./types";

const Label = ({ children, name }: LabelProps) => {
  return (
    <label className="text-sm font-medium text-purple-1000" htmlFor={name}>
      {children}
    </label>
  );
};

export default Label;
