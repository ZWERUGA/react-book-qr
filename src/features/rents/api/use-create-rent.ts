import { useToast } from "@/hooks/use-toast";
import { api } from "../../../../convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useState } from "react";

export function useCreateRent() {
  const { toast } = useToast();
  const [isLoading, setLoading] = useState(false);

  const mutation = useMutation(api.rents.create);

  const mutate = async (bookId: Id<"books">) => {
    try {
      setLoading(true);
      await mutation({ bookId });
      toast({
        title: "Взятие книги в аренду",
        description: "Запрос на взятие книги отправлен библиотекарю",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Взятие книги в аренду",
        description:
          "При отправке запроса на взятие книги в аренду произошла ошибка.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { mutate, isLoading };
}
