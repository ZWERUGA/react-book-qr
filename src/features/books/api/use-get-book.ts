import { useQuery } from "convex/react";
import { Id } from "convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

export function useGetBook(bookId: Id<"books">) {
	const book = useQuery(api.books.getById, { bookId });
	const isLoading = book === undefined;

	return { book, isLoading };
}
