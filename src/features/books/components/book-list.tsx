import { Label } from "@/components/ui/label";
import { MoveRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { TBook } from "../book-type";
import { Pagination } from "@/components/ui/pagination";

interface BookListProps {
  title: string;
  books: TBook[] | undefined;
}

export function BookList({ title, books }: BookListProps) {
  const changeImageZoomLink = (imageLink?: string) => {
    return imageLink?.replace("zoom=1", "zoom=3");
  };

  const truncateDescription = (description?: string) => {
    return description && description.length > 150
      ? `${description?.slice(0, 150)}...`
      : description;
  };

  if (!books?.length) {
    return <div className="flex justify-center">Нет книг...</div>;
  }

  return (
    <div>
      <h1 className="text-4xl">{title}</h1>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {books.map((book) => (
          <Link
            key={book._id}
            to={"/books/$bookId"}
            params={{ bookId: book._id }}
            className="flex gap-x-2 border rounded-md p-1 bg-muted relative  group hover:bg-cyan-100 dark:hover:bg-cyan-950 hover: transition-colors"
          >
            <div className="flex flex-shrink-0 w-[200px] h-[300px]">
              <img
                className="w-full h-full object-cover rounded-md"
                src={changeImageZoomLink(book.imageLink)}
                alt={book.title}
              />
            </div>

            <div className="flex flex-col gap-y-2">
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold">{book.title}</h2>
                <h3>
                  Автор:{" "}
                  <span className="italic text-sm">
                    {book.authors?.length
                      ? book.authors?.map((author) => author).join(", ")
                      : "Нет автора"}
                  </span>
                </h3>
              </div>

              <div className="mt-4">
                <h3>Описание:</h3>
                <p>{truncateDescription(book.description)}</p>
              </div>

              <div className="flex gap-x-5 mt-auto">
                <div>
                  <p>
                    <span className="text-base">Издатель: </span>
                    <span className="italic">
                      {book.publisher ? `"${book.publisher}"` : "не указан"}
                    </span>
                  </p>
                  <p>
                    <span className="text-base">Дата издания: </span>
                    <span className="italic">
                      {book.publishedDate ?? "не указана"}
                    </span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="text-base">Язык: </span>{" "}
                    <span className="italic">
                      {book.language ?? "не указан"}
                    </span>
                  </p>
                  <p>
                    <span className="text-base">Страниц: </span>{" "}
                    <span className="italic">
                      {book.pageCount ?? "не указано"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <Label className="flex opacity-0 absolute right-10 text-cyan-950 dark:text-cyan-300 bottom-1 group-hover:translate-x-7 group-hover:opacity-100 transition-all items-center gap-x-2">
              Подробнее <MoveRight />
            </Label>
          </Link>
        ))}
      </div>

      
    </div>
  );
}
