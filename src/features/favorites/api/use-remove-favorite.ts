import { useToast } from "@/hooks/use-toast";
import { api } from "../../../../convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";

export function useDeleteFavorite() {
  const { toast } = useToast();
  const [isLoading, setLoading] = useState(false);

  const mutation = useMutation(api.favorites.remove);

  const mutate = async (favoriteId: Id<"favorites">) => {
    try {
      setLoading(true);
      await mutation({ favoriteId });
      toast({
        title: "Удаление книги из избранного",
        description: "Книга удалена из избранного",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Удаление книги из избранного",
        description: "При удалении книги из избранного произошла ошибка",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { mutate, isLoading };
}
