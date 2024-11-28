import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export function useGetFavorites() {
  const favoriteBooks = useQuery(api.favorites.getAllById);
  const isLoading = favoriteBooks === undefined;

  return { favoriteBooks, isLoading };
}
