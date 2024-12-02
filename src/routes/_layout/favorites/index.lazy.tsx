import Loader from "@/components/loader";
import { BookList } from "@/features/books/components/book-list";
import { SearchBar } from "@/features/books/components/search-bar";
import { useGetFavoritesBooks } from "@/features/favorites/api/use-get-favorite-books";
import { useBooks } from "@/hooks/use-books";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_layout/favorites/")({
  component: Favorites,
});

function Favorites() {
  const { favoriteBooks, isLoading } = useGetFavoritesBooks();

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
  } = useBooks(favoriteBooks, isLoading);

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
          favoriteBooks={null}
          currentPage={currentPage}
          pageNumbers={pageNumbers}
          paginate={paginate}
        />
      </div>
    </div>
  );
}
