import { Button } from "@/components/ui/button";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useGetBooks } from "../../hooks/books/use-get-books";

export const Route = createLazyFileRoute("/books/")({
	component: Books,
});

function Books() {
	const { results, status, loadMore } = useGetBooks();

	return (
		<div>
			{results?.map((book) => (
				<div key={book._id} className="flex gap-x-2">
					<h1 className="text-xs truncate">{book.title}</h1>
				</div>
			))}
			<Button onClick={() => loadMore(5)} disabled={status !== "CanLoadMore"}>
				Load More
			</Button>
		</div>
	);
}
