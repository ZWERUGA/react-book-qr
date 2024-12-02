import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { baseUrl } from "@/constants/links";
import { Id } from "convex/_generated/dataModel";
import { HandHelping } from "lucide-react";
import QRCode from "react-qr-code";

interface GetBookButtonProps {
  book:
    | {
        _id: Id<"books">;
        _creationTime: number;
        title?: string | undefined;
        authors?: string[] | undefined;
        description?: string | undefined;
        identifier?: string | undefined;
        imageLink?: string | undefined;
        language?: string | undefined;
        pageCount?: number | undefined;
        publishedDate?: string | undefined;
        publisher?: string | undefined;
      }
    | null
    | undefined;
}

export function GetBookButton({ book }: GetBookButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-3 w-full">
          <HandHelping />
          Получить
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Получить книгу</DialogTitle>
          <DialogDescription>
            Для того, чтобы получить книгу, отсканируйте QR-код.
          </DialogDescription>
        </DialogHeader>
        <QRCode
          size={128}
          className="p-1 rounded-md bg-white justify-self-center"
          value={`${baseUrl}/books/rent/${book?._id}`}
        />
      </DialogContent>
    </Dialog>
  );
}
