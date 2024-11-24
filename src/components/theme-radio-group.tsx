import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LabelRadioGroup } from "./ui/label-radio-group";
import { Sun, Moon, MonitorCog } from "lucide-react";
import { Theme, useTheme } from "./theme-provider";

export function ThemeRadioGroup() {
  const { theme, setTheme } = useTheme();

  return (
    <RadioGroup
      defaultValue={theme}
      className="flex flex-col sm:flex-row"
      onValueChange={(value) => setTheme(value as Theme)}
    >
      <div className="sm:w-1/3">
        <RadioGroupItem value="light" id="light-theme" />
        <LabelRadioGroup htmlFor="light-theme" title="Светлая" icon={Sun} />
      </div>
      <div className="sm:w-1/3">
        <RadioGroupItem value="dark" id="dark-theme" />
        <LabelRadioGroup htmlFor="dark-theme" title="Темная" icon={Moon} />
      </div>
      <div className="sm:w-1/3">
        <RadioGroupItem value="system" id="system-theme" />
        <LabelRadioGroup
          htmlFor="system-theme"
          title="Системная"
          icon={MonitorCog}
        />
      </div>
    </RadioGroup>
  );
}
