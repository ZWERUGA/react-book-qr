import Loader from "@/components/loader";
import { UserMenu } from "@/components/user-menu";
import { Authenticated, Unauthenticated } from "convex/react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useCurrentUser } from "@/hooks/use-current-user";
import { HeaderLink } from "@/components/header-link";
import { Logo } from "@/components/logo";

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

  console.log(currentUser);

  return (
    <>
      <div className="flex justify-between p-3">
        <nav className="flex items-center gap-x-2 list-none">
          <li className="hover:bg-slate-300 dark:hover:bg-slate-800 transition-colors rounded-md">
            <HeaderLink to="/">
              <Logo />
            </HeaderLink>
          </li>
          <li className="h-full hover:bg-slate-300 dark:hover:bg-slate-800 transition-colors rounded-md">
            <HeaderLink to="/books" title="Книги" className="h-full" />
          </li>
        </nav>
        <div className="flex items-center gap-x-2">
          <UserMenu />
        </div>
      </div>
      <hr />
      <Outlet />
    </>
  );
}
