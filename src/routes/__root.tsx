import { Toaster } from "@/components/ui/toaster";
import { useCurrentUser } from "@/hooks/use-current-user";
import { cn } from "@/lib/utils";
import {
  createRootRoute,
  Outlet,
  useLocation,
  useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const location = useLocation();
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (
      location.href !== "/auth/sign-in" &&
      location.href !== "/auth/sign-up"
    ) {
      sessionStorage.setItem("prevPage", location.href);
    }

    if (
      currentUser &&
      (location.href === "/auth/sign-in" || location.href === "/auth/sign-up")
    ) {
      router.history.push(sessionStorage.getItem("prevPage") ?? "/");
    }

    if (
      !currentUser &&
      (location.href === "/profile" || location.href.includes("/books/rent/"))
    ) {
      router.history.push("/auth/sign-in");
    }
  }, [currentUser, location.href, router.history]);

  window.addEventListener("scroll", () => {
    if (scrollY > 1000) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <div className="container flex flex-col mx-auto h-screen">
      <Toaster />
      <Outlet />
      <TanStackRouterDevtools />

      <a
        className={cn(
          "fixed bottom-5 right-5 border rounded-md p-4 opacity-0 transition-opacity cursor-pointer bg-cyan-100 hover:bg-cyan-200 dark:bg-cyan-700 dark:hover:bg-cyan-900 hover:transition-colors",
          isScrolled && "opacity-100"
        )}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <ChevronUp />
      </a>
    </div>
  );
}
