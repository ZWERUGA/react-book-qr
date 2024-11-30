import { Button } from "./ui/button";
import { IconType } from "react-icons/lib";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialButtonProps {
  icon: IconType;
  provider: "github" | "google" | "yandex";
  title: "Github" | "Google" | "Yandex";
}

export function SocialButton({
  icon: Icon,
  provider,
  title,
}: SocialButtonProps) {
  const { toast } = useToast();
  const { signIn } = useAuthActions();

  const [isLoading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);

    signIn(provider, {
      redirectTo: sessionStorage.getItem("prevPage") ?? "/",
    })
      .then(() => {
        toast({
          title: "Вход в систему",
          description: "Продолжите авторизацию на стороннем сервисе",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Button
      variant="outline"
      onClick={handleClick}
      className="w-full sm:w-[100px]"
    >
      {isLoading ? (
        <Loader className="animate-spin" />
      ) : (
        <>
          <Icon />
          {title}
        </>
      )}
    </Button>
  );
}
