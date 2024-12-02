import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export function useGetFavoritesBooks() {
  const favoriteBooks = useQuery(api.favorites.getAllFavorites);
  const isLoading = favoriteBooks === undefined;

  return { favoriteBooks, isLoading };
}
