import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@tanstack/react-router";
import { Separator } from "./ui/separator";
import { ThemeRadioGroup } from "./theme-radio-group";
import {
  BookHeart,
  CircleUserRound,
  House,
  LogIn,
  LogOut,
  SquareMenu,
  UserPlus,
} from "lucide-react";
import { Authenticated, Unauthenticated } from "convex/react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSignOut } from "@/hooks/use-sign-out";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const navLinks = [
  {
    id: 1,
    to: "/",
    title: "Главная",
    icon: <House />,
  },
  {
    id: 2,
    to: "/books",
    title: "Книги",
    icon: <BookHeart />,
  },
];

const unauthorizedUserLinks = [
  {
    id: 1,
    to: "/auth/sign-in",
    title: "Войти",
    icon: <LogIn />,
  },
  {
    id: 2,
    to: "/auth/sign-up",
    title: "Зарегистрироваться",
    icon: <UserPlus />,
  },
];

const authorizedUserLinks = [
  {
    id: 1,
    to: "/profile",
    title: "Профиль",
    icon: <LogIn />,
  },
];

export function CustomSheet() {
  const { handleSignOut } = useSignOut();
  const { currentUser } = useCurrentUser();

  const avatarFallback = currentUser?.name?.charAt(0).toUpperCase();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Avatar className="cursor-pointer flex items-center justify-center">
          <Unauthenticated>
            <CircleUserRound size={30} />
          </Unauthenticated>
          <Authenticated>
            <AvatarImage
              src={currentUser?.imageUrl ?? ""}
              className="object-cover"
            />
            <AvatarFallback className="text-xl">
              {avatarFallback}
            </AvatarFallback>
          </Authenticated>
        </Avatar>
      </SheetTrigger>
      <SheetContent className="w-full h-1/2 text-xs sm:text-base" side="bottom">
        <SheetDescription></SheetDescription>
        <div className="flex flex-col h-full gap-y-2 p-2 overflow-auto scrollbar">
          {navLinks.map((link) => (
            <SheetClose key={link.id} asChild>
              <Link
                to={link.to}
                className="hover:bg-slate-300 dark:hover:bg-slate-800 p-2 border rounded-md hover:transition-colors flex flex-col items-center gap-y-1 justify-center"
              >
                {link.icon}
                {link.title}
              </Link>
            </SheetClose>
          ))}
          <Separator />

          <Unauthenticated>
            <SheetTitle className="text-sm sm:text-base">
              Войдите или зарегистрируйтесь
            </SheetTitle>
            <Separator />
            <div className="flex gap-x-2">
              {unauthorizedUserLinks.map((link) => (
                <SheetClose key={link.id} asChild>
                  <Link
                    to={link.to}
                    className="hover:bg-slate-300 dark:hover:bg-slate-800 p-2 border rounded-md hover:transition-colors flex flex-col items-center gap-y-1 justify-center w-1/2"
                  >
                    {link.icon}
                    {link.title}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </Unauthenticated>

          <Authenticated>
            <div className="flex justify-between items-center gap-x-2">
              <SheetTitle className="text-base truncate">
                {currentUser?.name}
              </SheetTitle>
              <span className="text-slate-500 text-sm">
                {currentUser?.email}
              </span>
            </div>
            <Separator />
            <div className="flex gap-x-2">
              {authorizedUserLinks.map((link) => (
                <SheetClose key={link.id} asChild>
                  <Link
                    to={link.to}
                    className="hover:bg-slate-300 dark:hover:bg-slate-800 p-2 border rounded-md hover:transition-colors flex flex-col items-center gap-y-1 justify-center w-full"
                  >
                    {link.icon}
                    {link.title}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </Authenticated>

          <Separator />
          <SheetTitle className="text-sm sm:text-base">Тема</SheetTitle>
          <Separator />
          <ThemeRadioGroup />
          <Separator />
          <Authenticated>
            <SheetClose asChild>
              <Link
                to={"/"}
                onClick={handleSignOut}
                className="bg-red-500/90 hover:bg-red-900/90 hover:text-white p-2 border rounded-md hover:transition-colors flex flex-col items-center gap-y-1 justify-center w-full"
              >
                <LogOut />
                Выйти
              </Link>
            </SheetClose>
          </Authenticated>
        </div>
      </SheetContent>
    </Sheet>
  );
}
