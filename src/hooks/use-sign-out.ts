import { useAuthActions } from "@convex-dev/auth/react";
import { useToast } from "@/hooks/use-toast";

export function useSignOut() {
  const { toast } = useToast();
  const { signOut } = useAuthActions();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Выход из системы",
      description: "Вы успешно вышли из системы",
    });
  };

  return {
    handleSignOut,
  };
}
