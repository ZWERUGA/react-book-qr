import { useQuery } from "convex/react";
import { Id } from "convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

export function useGetFavorite(bookId: Id<"books">) {
  const favoriteBook = useQuery(api.favorites.getById, { bookId });
  const isLoading = favoriteBook === undefined;

  return { favoriteBook, isLoading };
}
