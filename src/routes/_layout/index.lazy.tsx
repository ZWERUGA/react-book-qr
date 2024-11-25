import Loader from "@/components/loader";
import { BookList } from "@/features/books/components/book-list";
import { SearchBar } from "@/features/books/components/search-bar";
import { useGetBooks } from "@/features/books/api/use-get-books";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import { PaginationBooks } from "@/features/books/components/pagination";

export const Route = createLazyFileRoute("/_layout/")({
  component: Index,
});

function Index() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectInput, setSelectInput] = useState<string>("title");

  const [searchText] = useDebounce(searchInput, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);

  const booksPerPage = 4;

  const { books, isLoading } = useGetBooks();

  const booksData = useMemo(() => {
    let computedBooks = books;

    if (searchText) {
      computedBooks = computedBooks?.filter((book) =>
        book.title?.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setTotalBooks(computedBooks?.length ?? 0);

    return computedBooks?.slice(
      (currentPage - 1) * booksPerPage,
      (currentPage - 1) * booksPerPage + booksPerPage
    );
  }, [books, currentPage, searchText]);

  if (isLoading) {
    return (
      <div className="flex h-full justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (!books) {
    return (
      <div className="flex items-center justify-center h-full">Книг нет...</div>
    );
  }

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBooks / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="flex flex-col h-full p-2">
      <SearchBar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        selectInput={selectInput}
        setSelectInput={setSelectInput}
        setCurrentPage={setCurrentPage}
      />

      {/* <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <button onClick={() => paginate(number)} className="page-link">
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav> */}

      <div className="mt-2">
        <BookList title="Все книги" books={booksData} />
      </div>

      <div className="mt-4">
        <PaginationBooks
          pageNumbers={pageNumbers}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
