import { Button } from "@/components/ui/button";
import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { useGetBooks } from "../../features/books/api/use-get-books";

import { BATCH_SIZE } from "@/constants/books";
import noBookImage from "@/assets/no-book-image.jpg";

export const Route = createLazyFileRoute("/books/")({
	component: Books,
});

function Books() {
	const { results: books, status, loadMore } = useGetBooks();

	const changeImageZoomLink = (imageLink?: string) => {
		return imageLink?.replace("zoom=1", "zoom=3");
	};

	const displayTitle = (title?: string) => {
		return title && title.length > 50 ? `${title?.slice(0, 50)} ...` : title;
	};

	if (status === "LoadingFirstPage") {
		return <div>Loading books...</div>;
	}

	return (
		<div className="flex flex-col gap-y-2 items-center p-3">
			<div className="grid 2xl:grid-cols-6 gap-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2">
				{books?.map((book) => (
					<div
						key={book._id}
						className="border bg-card flex flex-col gap-2 items-center p-3 rounded-xl"
					>
						<div className="flex items-center">
							<img
								className="2xl:h-80 gap-5 md:h-64 sm:h-52 h-40"
								src={changeImageZoomLink(book.imageLink) ?? noBookImage}
								alt={book.title}
							/>
						</div>
						<div className="flex flex-col gap-y-2 h-full items-center text-center">
							<div className="flex flex-col gap-1 h-full">
								<p className="sm:text-sm md:text-base lg:text-lg text-xs font-semibold text-card-foreground">
									{displayTitle(book.title)}
								</p>
								<span className="text-xs italic mt-auto">
									{book.authors?.length
										? book.authors?.length > 2
											? `${book.authors
													?.slice(0, 2)
													.map((author) => author)
													.join(", ")} и др.`
											: book.authors?.map((author) => author).join(", ")
										: "Нет автора"}
								</span>
							</div>
							<Button className="mt-auto">
								<Link to="/books/$bookId" params={{ bookId: book._id }}>
									Подробнее
								</Link>
							</Button>
						</div>
					</div>
				))}
			</div>
			<Button
				onClick={() => loadMore(BATCH_SIZE)}
				disabled={status !== "CanLoadMore"}
			>
				{status === "LoadingMore"
					? "Загрузка..."
					: status !== "CanLoadMore"
						? "Нет книг"
						: "Показать еще"}
			</Button>
		</div>
	);
}
