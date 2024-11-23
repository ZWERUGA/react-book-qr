import { Button } from "./ui/button";
import { IconType } from "react-icons/lib";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { Loader } from "lucide-react";

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
  const { signIn } = useAuthActions();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    setLoading(true);

    signIn(provider).finally(() => setLoading(false));
  };

  return (
    <Button variant="outline" onClick={handleClick}>
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
