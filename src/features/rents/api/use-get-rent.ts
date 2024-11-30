import { useQuery } from "convex/react";
import { Id } from "convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

export function useGetRent(bookId: Id<"books">) {
  const rentBook = useQuery(api.rents.getById, { bookId });
  const isLoading = rentBook === undefined;

  return { rentBook, isLoading };
}
