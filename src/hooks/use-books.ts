import { BATCH_SIZE } from "@/constants/books";
import { TBook } from "@/features/books/book-type";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

export const useBooks = (
  books: (TBook | null)[] | undefined | null,
  isLoading: boolean
) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectInput, setSelectInput] = useState<string>("title");
  const [searchText] = useDebounce(searchInput, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);
  const booksPerPage = BATCH_SIZE;

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

  return {
    isLoading,
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
  };
};
