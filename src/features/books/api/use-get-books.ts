import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export function useGetBooks() {
  const books = useQuery(api.books.getAll);
  const isLoading = books === undefined;

  return { books, isLoading };
}
