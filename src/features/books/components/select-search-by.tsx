import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SelectSearchBy() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="По названию" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="title">По названию</SelectItem>
          <SelectItem value="author">По автору</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
