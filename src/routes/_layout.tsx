import { Authenticated, Unauthenticated } from "convex/react";
import { UserMenu } from "@/components/profile";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useCurrentUser } from "@/hooks/use-current-user";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  const { currentUser } = useCurrentUser();

  return (
    <>
      <div className="flex justify-between p-3">
        <nav className="flex items-center gap-x-2 list-none">
          <li>
            <Link
              to="/"
              className="px-4 py-2 [&.active]:border-b border-foreground"
            >
              Главная
            </Link>
          </li>
          <li>
            <Link
              to="/books"
              className="px-4 py-2 [&.active]:border-b border-foreground"
            >
              Книги
            </Link>
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
          <UserMenu
            image={currentUser?.image}
            username={currentUser?.name}
            email={currentUser?.email}
            role={currentUser?.role === 'user' ? 'Читатель' : 'Библиотекарь'}
          />
        </div>
      </div>
      <hr />
      <Outlet />
    </>
  );
}
