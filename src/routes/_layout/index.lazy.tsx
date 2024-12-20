import Loader from "@/components/loader";
import { BookList } from "@/features/books/components/book-list";
import { SearchBar } from "@/features/books/components/search-bar";
import { useGetBooks } from "@/features/books/api/use-get-books";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useGetFavorites } from "@/features/favorites/api/use-get-favorites";
import { useBooks } from "@/hooks/use-books";

export const Route = createLazyFileRoute("/_layout/")({
  component: Index,
});

function Index() {
  const { books, isLoading } = useGetBooks();
  const { favorites } = useGetFavorites();

  const {
    searchInput,
    setSearchInput,
    selectInput,
    setSelectInput,
    setCurrentPage,
    booksData,
    currentPage,
    pageNumbers,
    paginate,
    setBookListTitle,
  } = useBooks(books, isLoading);

  if (isLoading) {
    return (
      <div className="flex h-full justify-center items-center">
        <Loader />
      </div>
    );
  }

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
          favoriteBooks={favorites}
          currentPage={currentPage}
          pageNumbers={pageNumbers}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
