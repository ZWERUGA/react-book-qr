import Loader from "@/components/loader";
import { BookList } from "@/features/books/components/book-list";
import { SearchBar } from "@/features/books/components/search-bar";
import { useGetBooks } from "@/features/books/api/use-get-books";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { BATCH_SIZE } from "@/constants/books";
import { useGetFavorites } from "@/features/favorites/api/use-get-favorites";

export const Route = createLazyFileRoute("/_layout/")({
  component: Index,
});

function Index() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectInput, setSelectInput] = useState<string>("title");
  const [searchText] = useDebounce(searchInput, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);

  const booksPerPage = BATCH_SIZE;

  const { books, isLoading } = useGetBooks();
  const { favoriteBooks } = useGetFavorites();

  const booksData = useMemo(() => {
    let computedBooks = books;

    if (searchText) {
      computedBooks =
        selectInput === "title"
          ? computedBooks?.filter((book) =>
              book.title?.toLowerCase().includes(searchText.toLowerCase())
            )
          : computedBooks?.filter((book) =>
              book.authors?.some((author) =>
                author.toLowerCase().includes(searchText.toLowerCase())
              )
            );
    }

    setTotalBooks(computedBooks?.length ?? 0);

    return computedBooks?.slice(
      0,
      (currentPage - 1) * booksPerPage + booksPerPage
    );
  }, [books, booksPerPage, currentPage, searchText, selectInput]);

  if (isLoading) {
    return (
      <div className="flex h-full justify-center items-center">
        <Loader />
      </div>
    );
  }

  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = () => setCurrentPage((prev) => prev + 1);

  const setBookListTitle = () => {
    if (searchText) {
      if (selectInput === "title")
        return `Книги, в названиях которых есть: ${searchText} (${totalBooks})`;

      if (selectInput === "author")
        return `Книги, автором которых является: ${searchText} (${totalBooks})`;
    }

    return `Все книги (${totalBooks})`;
  };

  return (
    <div className="flex flex-col h-full p-2">
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectInput={selectInput}
        setSelectInput={setSelectInput}
        setCurrentPage={setCurrentPage}
      />

      <div className="mt-2">
        <BookList
          title={setBookListTitle()}
          books={booksData}
          favoriteBooks={favoriteBooks}
          currentPage={currentPage}
          pageNumbers={pageNumbers}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
