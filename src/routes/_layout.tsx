import Loader from "@/components/loader";
import { UserMenu } from "@/components/user-menu";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useCurrentUser } from "@/hooks/use-current-user";
import { HeaderLink } from "@/components/header-link";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { CustomSheet } from "@/components/custom-sheet";

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full absolute top-0 right-0 left-0 bottom-0">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col h-full px-1 2xl:p-0">
        {/* HEADER */}
        <div className="flex justify-between items-center py-1">
          <nav className="list-none flex">
            <HeaderLink to="/">
              <Logo />
            </HeaderLink>
            <div className="hidden lg:flex">
              <HeaderLink to="/books" title="Книги" />
            </div>
          </nav>
          <div className="hidden md:block">
            <UserMenu />
          </div>
          <div className="block md:hidden">
            <CustomSheet />
          </div>
        </div>
        <Separator />
        <Outlet />
      </div>
    </>
  );
}
