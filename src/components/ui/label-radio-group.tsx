import { Label } from "./label";
import { LucideProps } from "lucide-react";

interface LabelRadioGroupProps {
  htmlFor: string;
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}

export function LabelRadioGroup({
  htmlFor,
  title,
  icon: Icon,
}: LabelRadioGroupProps) {
  return (
    <Label
      htmlFor={htmlFor}
      className="flex flex-col items-center gap-y-2 p-2 cursor-pointer rounded-md border peer-data-[state=checked]:text-white peer-data-[state=checked]:bg-slate-500 [&:has([data-state=checked])]:border-primary hover:bg-slate-300 dark:hover:bg-slate-800 hover:transition-colors"
    >
      <Icon />
      <span>{title}</span>
    </Label>
  );  
}
