import { Id } from "convex/_generated/dataModel";
import { createFileRoute } from "@tanstack/react-router";
import { useGetBook } from "@/features/books/api/use-get-book";
import Loader from "@/components/loader";
import { changeImageZoomLink } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export const Route = createFileRoute("/_layout/books/$bookId")({
  component: Book,
});

function Book() {
  const { bookId } = Route.useParams();

  const { book, isLoading } = useGetBook(bookId as Id<"books">);

  if (isLoading) {
    return (
      <div className="flex h-full justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col border p-2 mt-2 rounded-md gap-x-5 lg:w-[900px] mx-auto">
      {/* Изображение */}
      <div className="flex flex-shrink-0 w-full h-[300px] justify-center relative">
        <img
          className="w-[180px] h-full object-cover rounded-md"
          src={changeImageZoomLink(book?.imageLink)}
          alt={book?.title}
        />
        <Button
          variant="outline"
          className="absolute top-0 right-0 p-3 border-yellow-500 "
        >
          <Star className="fill-yellow-500 text-yellow-500" />
          <span className="hidden sm:block">В избранное</span>
        </Button>
      </div>

      {/* Описание */}
      <div className="flex flex-col">
        <div className="flex flex-col">
          <p className="text-base md:text-xl text-center mt-2">{book?.title}</p>

          <Separator className="my-2" />

          <p className="text-xs md:text-base">
            <span>Автор(ы)</span>:{" "}
            <p className="italic">{book?.authors ?? "не указаны"}</p>
          </p>
        </div>

        <Separator className="my-2" />

        <div className="text-xs md:text-base">
          <p>Описание: </p>
          <p>{book?.description ?? "не указано"}</p>
        </div>

        <Separator className="my-2" />

        <div className="flex justify-between text-sm md:text-base">
          <span>Язык: {book?.language ?? "не указан"}</span>
          <span>Страниц: {book?.pageCount ?? "не указано"}</span>
        </div>

        <Separator className="my-2" />

        <div className="text-sm md:text-base">
          <p>Издатель: {book?.publisher ?? "не указан"}</p>
          <p>Дата издания: {book?.publishedDate ?? "не указана"}</p>
        </div>
      </div>
    </div>
  );
}
