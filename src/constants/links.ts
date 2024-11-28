import { House, LogIn, UserPlus } from "lucide-react";

export const navLinks = [
  {
    id: 1,
    to: "/",
    title: "Главная",
    icon: House,
  }
];

export const unauthorizedUserLinks = [
  {
    id: 1,
    to: "/auth/sign-in",
    title: "Войти",
    icon: LogIn,
  },
  {
    id: 2,
    to: "/auth/sign-up",
    title: "Зарегистрироваться",
    icon: UserPlus,
  },
];

export const authorizedUserLinks = [
  {
    id: 1,
    to: "/profile",
    title: "Профиль",
    icon: LogIn,
  },
];
