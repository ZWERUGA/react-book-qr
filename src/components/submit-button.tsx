import { Button } from "./ui/button";
import { Loader } from "lucide-react";

interface SubmitButtonProps {
  isLoading: boolean;
}

export function SubmitButton({ isLoading }: SubmitButtonProps) {
  return (
    <Button disabled={isLoading} type="submit">
      {isLoading && <Loader className="animate-spin" />}
      {isLoading ? "Подождите..." : "Продолжить"}
    </Button>
  );
}
