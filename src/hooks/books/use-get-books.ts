import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function useGetBooks() {
	const { results, status, loadMore } = usePaginatedQuery(
		api.books.getAll,
		{},
		{ initialNumItems: 5 }
	);

	return {
		results,
		status,
		loadMore,
	};
}
