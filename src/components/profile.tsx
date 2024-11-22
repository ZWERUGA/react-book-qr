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

interface UserMenuProps {
  image?: string;
  username?: string;
  email?: string;
  role?: string;
}

export function UserMenu({ image, username, email, role }: UserMenuProps) {
  const navigate = useNavigate();
  const { setTheme } = useTheme();
  const { signOut } = useAuthActions();

  const avatarFallback = username?.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer flex items-center justify-center">
          <Unauthenticated>
            <CircleUserRound size={30} />
          </Unauthenticated>
          <Authenticated>
            <AvatarImage src={image} />
            <AvatarFallback className="text-xl">
              {avatarFallback}
            </AvatarFallback>
          </Authenticated>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-52 drop-shadow-md shadow-2xl"
      >
        <Authenticated>
          <DropdownMenuLabel>
            <div>
              <div className="flex justify-between items-center">
                <p className="text-xl">{username}</p>
                <span className="text-xs text-slate-500">{role}</span>
              </div>
              <span className="text-sm text-slate-500">{email}</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
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
          <DropdownMenuItem className="cursor-pointer" onSelect={signOut}>
            <LogOut />
            <span>Выйти</span>
          </DropdownMenuItem>
        </Authenticated>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
