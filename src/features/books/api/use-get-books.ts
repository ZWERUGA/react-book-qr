import { BATCH_SIZE } from "@/constants/books";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export function useGetBooks() {
	const { results, status, loadMore } = usePaginatedQuery(
		api.books.getAll,
		{},
		{ initialNumItems: BATCH_SIZE }
	);

	return {
		results,
		status,
		loadMore,
	};
}
