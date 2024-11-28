import { useToast } from "@/hooks/use-toast";
import { api } from "../../../../convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";

export function useAddFavorite(bookId: Id<"books">) {
  const { toast } = useToast();
  const [isLoading, setLoading] = useState(false);

  const mutation = useMutation(api.favorites.add);

  const mutate = async () => {
    try {
      setLoading(true);
      await mutation({ bookId });
      toast({
        title: "Добавление книги в избранное",
        description: "Книга добавлена в избранное",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Добавление книги в избранное",
        description: "При добавлении книги в избранное произошла ошибка",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { mutate, isLoading };
}
