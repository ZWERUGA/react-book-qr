import Loader from "@/components/loader";
import { UserMenu } from "@/components/user-menu";
import { Authenticated, Unauthenticated } from "convex/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useCurrentUser } from "@/hooks/use-current-user";
import { HeaderLink } from "@/components/header-link";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full absolute top-0 right-0 left-0 bottom-0">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-between p-3">
        <nav className="flex items-center gap-x-2 list-none">
          <li>
            <HeaderLink to="/" title="Главная" />
          </li>
          <li>
            <HeaderLink to="/books" title="Книги" />
          </li>
        </nav>
        <div className="flex items-center gap-x-2">
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
          <UserMenu />
        </div>
      </div>
      <hr />
      <Outlet />
    </>
  );
}
