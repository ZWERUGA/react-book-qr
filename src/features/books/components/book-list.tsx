import { Link } from "@tanstack/react-router";
import { TBook } from "../book-type";
import noBookImage from "@/assets/no-book-image.jpg";
import { changeImageZoomLink, cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Loader from "@/components/loader";
import { Label } from "@/components/ui/label";
import { MoveRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Id } from "convex/_generated/dataModel";

interface BookListProps {
  title: string;
  books: TBook[] | undefined;
  favoriteBooks: Id<"books">[] | null | undefined;
  currentPage: number;
  pageNumbers: number[];
  paginate: () => void;
}

export function BookList({
  title,
  books,
  favoriteBooks,
  currentPage,
  pageNumbers,
  paginate,
}: BookListProps) {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (!inView) {
      return;
    }

    if (pageNumbers.includes(currentPage + 1)) {
      paginate();
    }
  }, [inView]);

  const displayTitle = (title?: string) => {
    return title && title.length > 35 ? `${title?.slice(0, 35)}...` : title;
  };

  if (!books?.length) {
    return <div className="flex justify-center text-lg">Нет книг...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl">{title}</h1>

      <div className="grid 2xl:grid-cols-6 gap-1 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-2">
        <TooltipProvider delayDuration={300}>
          {books?.map((book) => (
            <Tooltip key={book._id}>
              <TooltipTrigger asChild>
                <Link
                  to={"/books/$bookId"}
                  params={{ bookId: book._id }}
                  key={book._id}
                  className={cn(
                    "border flex flex-col gap-2 items-center p-2 rounded-md relative group hover:bg-cyan-100 dark:hover:bg-cyan-950 hover:transition-colors",
                    favoriteBooks?.includes(book._id) && "border-yellow-500 bg-yellow-500/20"
                  )}
                >
                  <div className="flex items-center w-full justify-center bg-slate-200 dark:bg-primary/5 rounded-md py-3">
                    <img
                      className="2xl:h-80 gap-5 md:h-64 sm:h-52 h-40 rounded-md"
                      src={changeImageZoomLink(book.imageLink) ?? noBookImage}
                      alt={book.title}
                    />
                  </div>
                  <div className="flex flex-col gap-y-2 h-full items-center text-center">
                    <div className="flex flex-col gap-1 h-full">
                      <p className="sm:text-sm md:text-base lg:text-lg text-xs font-light text-card-foreground">
                        {displayTitle(book.title)}
                      </p>
                      <span className="text-xs italic mt-auto">
                        {book.authors?.length
                          ? book.authors?.length > 1
                            ? `${book.authors
                                ?.slice(0, 1)
                                .map((author) => author)
                                .join(", ")} и др.`
                            : book.authors?.map((author) => author).join(", ")
                          : "Нет автора"}
                      </span>
                    </div>

                    <Label className="flex opacity-0 absolute right-10 text-cyan-950 dark:text-cyan-300 bottom-1 group-hover:translate-x-7 group-hover:opacity-100 transition-all items-center gap-x-2 cursor-pointer">
                      <MoveRight />
                    </Label>
                  </div>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="bg-cyan-100 dark:bg-cyan-950 w-[280px] sm:w-[300px]">
                <p>{book.title}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>

      <div
        ref={ref}
        className={cn(pageNumbers.includes(currentPage + 1) ? "my-5" : "mt-2")}
      >
        {inView && pageNumbers.includes(currentPage + 1) && (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
}
