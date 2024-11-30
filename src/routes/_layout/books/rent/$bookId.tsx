import Loader from "@/components/loader";
import { useGetBook } from "@/features/books/api/use-get-book";
import { useCreateRent } from "@/features/rents/api/use-create-rent";
import { useGetRent } from "@/features/rents/api/use-get-rent";
import { useCurrentUser } from "@/hooks/use-current-user";
import { changeImageZoomLink, cn } from "@/lib/utils";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Id } from "convex/_generated/dataModel";
import { ArrowLeft, Check, Loader as LoaderLucide } from "lucide-react";
import { useEffect } from "react";

export const Route = createFileRoute("/_layout/books/rent/$bookId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { bookId } = Route.useParams();
  const { currentUser } = useCurrentUser();

  const { book, isLoading: bookIsLoading } = useGetBook(bookId as Id<"books">);
  const { rentBook, isLoading: rentBookIsLoading } = useGetRent(
    bookId as Id<"books">
  );
  const { mutate, isLoading } = useCreateRent();

  useEffect(() => {
    if (!rentBookIsLoading && !rentBook && currentUser) {
      mutate(bookId as Id<"books">);
    }
  }, [bookId, currentUser, mutate, rentBook, rentBookIsLoading]);

  if (bookIsLoading || rentBookIsLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full justify-center items-center h-full sm:w-[500px] mx-auto">
      <Link
        to={"/books/$bookId"}
        params={{ bookId }}
        className="flex gap-x-2 border-b border-white"
      >
        <ArrowLeft />
        Назад к книге
      </Link>
      <div className="mt-2">
        <img
          className="w-[150px] sm:w-[220px] rounded-md"
          src={changeImageZoomLink(book?.imageLink)}
          alt={book?.title}
        />
      </div>
      <p className="text-center text-sm mt-2">{book?.title}</p>
      <div
        className={cn(
          "mt-4 border w-full flex justify-center p-2 rounded-md transition-colors",
          isLoading ? "border-cyan-400" : "border-green-400"
        )}
      >
        {isLoading ? (
          <p className="flex gap-x-2">
            <LoaderLucide className="animate-spin" />
            Отправка запроса
          </p>
        ) : (
          <p className="flex gap-x-2">
            <Check />
            {rentBook?.confirmed
              ? "Вы уже получили эту книгу"
              : "Запрос на получение книги отправлен"}
          </p>
        )}
      </div>
    </div>
  );
}
