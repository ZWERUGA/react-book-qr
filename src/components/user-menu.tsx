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
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./theme-provider";
import { useNavigate } from "@tanstack/react-router";
import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated } from "convex/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { PROTECTED_ROUTES } from "@/constants/protected-routes";

export function UserMenu() {
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const { signOut } = useAuthActions();

  const { currentUser } = useCurrentUser();

  const avatarFallback = currentUser?.name?.charAt(0).toUpperCase();

  const currentPath = location.pathname;

  const handleSignOut = () => {
    if (PROTECTED_ROUTES.includes(currentPath)) {
      navigate({ to: "/" });
    }
  };

  console.log(currentUser);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-x-2 select-none cursor-pointer p-2 hover:bg-slate-300 dark:hover:bg-slate-800 transition-colors rounded-md">
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
        <DropdownMenuGroup>
          <DropdownMenuLabel>Тема</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className="cursor-pointer"
          >
            <Sun />
            Светлая
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("dark")}
            className="cursor-pointer"
          >
            <Moon />
            Темная
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("system")}
            className="cursor-pointer"
          >
            <MonitorCog />
            Системная
          </DropdownMenuItem>
        </DropdownMenuGroup>
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
