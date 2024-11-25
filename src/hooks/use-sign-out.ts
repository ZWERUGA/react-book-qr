import { PROTECTED_ROUTES } from "@/constants/protected-routes";
import { useAuthActions } from "@convex-dev/auth/react";
import { useNavigate } from "@tanstack/react-router";
import { useToast } from "@/hooks/use-toast";

export function useSignOut() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signOut } = useAuthActions();

  const currentPath = location.pathname;

  const handleSignOut = async () => {
    await signOut();
    if (PROTECTED_ROUTES.includes(currentPath)) {
      navigate({ to: "/" });
    }
    toast({
      title: "Выход из системы",
      description: "Вы успешно вышли из системы",
    });
  };

  return {
    handleSignOut,
  };
}
