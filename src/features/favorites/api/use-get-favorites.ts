import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export function useGetFavorites() {
  const favorites = useQuery(api.favorites.getAllIds);
  const isLoading = favorites === undefined;

  return { favorites, isLoading };
}
