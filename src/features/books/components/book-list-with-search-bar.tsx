import { BookList } from "./book-list";
import { SearchBar } from "./search-bar";

export function BookListWithSearchBar() {
	return (
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
	)
}