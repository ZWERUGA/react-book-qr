import {
  CircleUserRound,
  LogIn,
  LogOut,
  MonitorCog,
  Moon,
  Sun,
  User,
  UserPlus,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "@tanstack/react-router";
import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated } from "convex/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { PROTECTED_ROUTES } from "@/constants/protected-routes";
import { useTheme } from "./theme-provider";
import { useState } from "react";

export function UserMenu() {
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const { signOut } = useAuthActions();

  const { currentUser } = useCurrentUser();

  const [position, setPosition] = useState(
    localStorage.getItem("vite-ui-theme") ?? "light"
  );

  const avatarFallback = currentUser?.name?.charAt(0).toUpperCase();

  const currentPath = location.pathname;

  const handleSignOut = () => {
    if (PROTECTED_ROUTES.includes(currentPath)) {
      navigate({ to: "/" });
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-x-2 select-none cursor-pointer p-2 hover:bg-[#f4f4f6] dark:hover:bg-[#27262b] transition-colors rounded-md">
          <Unauthenticated>
            <div className="flex flex-col items-end">
              <p>Здравствуй, Гость!</p>
              <span className="text-xs text-slate-500">
                Войди или зарегистрируйся
              </span>
            </div>
          </Unauthenticated>
          <Authenticated>
            <p>Здравствуй, {currentUser?.name}</p>
          </Authenticated>
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
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-52 drop-shadow-md shadow-2xl"
      >
        <Authenticated>
          <DropdownMenuLabel>
            <div>
              <div className="flex justify-between items-center">
                <p className="text-xl">{currentUser?.name}</p>
              </div>
              <div className="mt-1">
                <p className="text-sm text-slate-500">{currentUser?.email}</p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() =>
              navigate({
                to: "/profile",
              })
            }
            className="cursor-pointer"
          >
            <User />
            <span>Профиль</span>
          </DropdownMenuItem>
        </Authenticated>
        <Unauthenticated>
          <DropdownMenuItem
            onSelect={() => navigate({ to: "/auth/sign-in" })}
            className="cursor-pointer"
          >
            <LogIn />
            Войти
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => navigate({ to: "/auth/sign-up" })}
            className="cursor-pointer"
          >
            <UserPlus />
            Зарегистрироваться
          </DropdownMenuItem>
        </Unauthenticated>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Тема</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem
            onClick={() => setTheme("light")}
            className="cursor-pointer flex items-center gap-x-2"
            value="light"
          >
            <Sun size={20} />
            Светлая
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => setTheme("dark")}
            className="cursor-pointer flex items-center gap-x-2"
            value="dark"
          >
            <Moon size={20} />
            Темная
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            onClick={() => setTheme("system")}
            className="cursor-pointer flex items-center gap-x-2"
            value="system"
          >
            <MonitorCog size={20} />
            Системная
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <Authenticated>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleSignOut}
            className="cursor-pointer"
            onSelect={signOut}
          >
            <LogOut />
            <span>Выйти</span>
          </DropdownMenuItem>
        </Authenticated>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
