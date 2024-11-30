import { Id } from "convex/_generated/dataModel";
import { createFileRoute } from "@tanstack/react-router";
import { useGetBook } from "@/features/books/api/use-get-book";
import Loader from "@/components/loader";
import { changeImageZoomLink, cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader as LoaderLucide, Star } from "lucide-react";
import { useAddFavorite } from "@/features/favorites/api/use-add-favorite";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useToast } from "@/hooks/use-toast";
import { useGetFavorite } from "@/features/favorites/api/use-get-favorite";
import { useDeleteFavorite } from "@/features/favorites/api/use-remove-favorite";
import QRCode from "react-qr-code";
import { baseUrl } from "@/constants/links";
import { GetBookButton } from "@/components/get-book-button";

export const Route = createFileRoute("/_layout/books/$bookId")({
  component: Book,
});

function Book() {
  const { bookId } = Route.useParams();
  const { currentUser } = useCurrentUser();

  const { book, isLoading } = useGetBook(bookId as Id<"books">);

  const { toast } = useToast();
  const { favoriteBook, isLoading: favoriteBookIsLoading } = useGetFavorite(
    bookId as Id<"books">
  );
  const { mutate: addFavorite, isLoading: bookIsAddingInFavorite } =
    useAddFavorite(bookId as Id<"books">);
  const { mutate: removeFavorite, isLoading: bookIsRemovingFromFavorite } =
    useDeleteFavorite();

  const handleClick = async () => {
    if (!currentUser) {
      toast({
        title: "Добавление книги в избранное",
        description: "Необходимо войти в систему",
        variant: "destructive",
      });

      return;
    }

    if (favoriteBook) {
      await removeFavorite(favoriteBook._id);
    } else {
      await addFavorite();
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-full justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col border p-2 mt-2 rounded-md gap-x-5 lg:w-[900px] mx-auto">
      <div className="flex flex-shrink-0 w-full h-[300px] justify-center relative">
        <img
          className="w-[180px] h-full object-cover rounded-md"
          src={changeImageZoomLink(book?.imageLink)}
          alt={book?.title}
        />
        <div className="absolute top-0 right-0 flex flex-col gap-y-1">
          <Button
            variant="outline"
            className={cn("p-3", favoriteBook && "border-yellow-500")}
            onClick={handleClick}
            disabled={
              bookIsAddingInFavorite ||
              favoriteBookIsLoading ||
              bookIsRemovingFromFavorite
            }
          >
            {bookIsAddingInFavorite ||
            favoriteBookIsLoading ||
            bookIsRemovingFromFavorite ? (
              <LoaderLucide className="animate-spin" />
            ) : (
              <Star
                className={cn(
                  favoriteBook && "fill-yellow-500 text-yellow-500"
                )}
              />
            )}

            <span className="hidden sm:block">
              {favoriteBook ? " Удалить из избранного" : "В избранное"}
            </span>
          </Button>
          <GetBookButton book={book} />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col">
          <p className="text-base md:text-xl text-center mt-2">{book?.title}</p>

          <Separator className="my-2" />

          <div className="text-xs md:text-base">
            <span>Автор(ы)</span>:{" "}
            <p className="italic">
              {book?.authors?.join(", ") ?? "не указаны"}
            </p>
          </div>
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
        <Separator className="my-2" />
      </div>
    </div>
  );
}
