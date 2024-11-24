import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@tanstack/react-router";
import { Separator } from "./ui/separator";
import { ThemeRadioGroup } from "./theme-radio-group";
import { SquareMenu } from "lucide-react";

const navLinks = [
  {
    id: 1,
    to: "/",
    title: "Главная",
  },
  {
    id: 2,
    to: "/books",
    title: "Книги",
  },
];

const userLinks = [
  {
    id: 1,
    to: "/auth/sign-in",
    title: "Войти",
  },
  {
    id: 2,
    to: "/auth/sign-up",
    title: "Зарегистрироваться",
  },
];

export function CustomSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <SquareMenu className="p-2 size-10 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-800 rounded-md hover:transition-colors" />
      </SheetTrigger>
      <SheetContent className="w-full h-1/2" side="bottom">
        <div className="flex flex-col h-full gap-y-2 p-1 overflow-auto scrollbar">
          {navLinks.map((link) => (
            <SheetClose key={link.id} asChild>
              <Link
                to={link.to}
                className="hover:bg-slate-300 dark:hover:bg-slate-800 p-2 border rounded-md block hover:transition-colors"
              >
                {link.title}
              </Link>
            </SheetClose>
          ))}
          <Separator />
          <div className="flex gap-x-2">
            <SheetClose asChild>
              <Link
                to={userLinks[0].to}
                className="hover:bg-slate-300 dark:hover:bg-slate-800 p-2 border rounded-md block w-1/2 text-center hover:transition-colors"
              >
                {userLinks[0].title}
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                to={userLinks[1].to}
                className="bg-slate-300 hover:bg-slate-500 text-black hover:text-white dark:bg-slate-500 dark:text-white dark:hover:text-black dark:hover:bg-slate-300 p-2 border rounded-md block w-1/2 text-center hover:transition-colors"
              >
                {userLinks[1].title}
              </Link>
            </SheetClose>
          </div>
          <Separator />
          <SheetTitle>Тема</SheetTitle>
          <Separator />
          <ThemeRadioGroup />
        </div>
      </SheetContent>
    </Sheet>
  );
}
