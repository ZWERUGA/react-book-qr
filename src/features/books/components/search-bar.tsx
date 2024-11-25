import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
  searchInput: string;
  selectInput: string;
  setSearchInput: (text: string) => void;
  setSelectInput: (text: string) => void;
  setCurrentPage: (page: number) => void;
}

export function SearchBar({
  searchInput,
  selectInput,
  setSearchInput,
  setSelectInput,
  setCurrentPage,
}: SearchBarProps) {
  return (
    <div className="flex gap-x-2">
      <Input
        type="search"
        placeholder="Найти книгу..."
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
          setCurrentPage(1);
        }}
      />
      <Select
        defaultValue={selectInput}
        onValueChange={(value) => setSelectInput(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={selectInput} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="title">По названию</SelectItem>
            <SelectItem value="author">По автору</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
