import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationBooksProps {
  currentPage: number;
  pageNumbers: number[];
  paginate: (pageNumber: number) => void;
}

export function PaginationBooks({
  currentPage,
  pageNumbers,
  paginate,
}: PaginationBooksProps) {
  const nextPage = () => {
    if (pageNumbers.includes(currentPage + 1)) {
      paginate(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (pageNumbers.includes(currentPage - 1)) {
      paginate(currentPage - 1);
    }
  };

  const getNextPageNumbers = () => {
    if (currentPage === 1) return 3;

    return currentPage + 1;
  };

  const getPrevPageNumbers = () => {
    if (currentPage === 1) return 0;

    return currentPage - 2;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious className="cursor-pointer" onClick={prevPage} />
        </PaginationItem>

        {currentPage > 2 && (
          <>
            <PaginationItem className="cursor-pointer">
              <PaginationLink onClick={() => paginate(1)}>{1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          </>
        )}

        <PaginationItem className="cursor-pointer">
          {pageNumbers
            .slice(getPrevPageNumbers(), getNextPageNumbers())
            .map((pageNumber) => (
              <PaginationLink
                key={pageNumber}
                isActive={currentPage === pageNumber}
                onClick={() => paginate(pageNumber)}
              >
                {pageNumber}
              </PaginationLink>
            ))}
        </PaginationItem>

        {pageNumbers.length - currentPage > 1 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem className="cursor-pointer">
              <PaginationLink onClick={() => paginate(pageNumbers.length)}>
                {pageNumbers.length}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext className="cursor-pointer" onClick={nextPage} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
