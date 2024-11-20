import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated } from "convex/react";
import { Separator } from "@/components/ui/separator";

export const Route = createRootRoute({
	component: Root,
});

function Root() {
	const { signOut } = useAuthActions();
	const { theme, setTheme } = useTheme();

	const handleToggleTheme = () => {
		return theme === "light" ? setTheme("dark") : setTheme("light");
	};

	return (
		<div className="container mx-auto font-primaryRegular">
			<div className="flex justify-between p-3">
				<div className="gap-x-2 items-center flex">
					<Link to="/" className="[&.active]:font-bold">
						Главная
					</Link>{" "}
					<Link to="/books" className="[&.active]:font-bold">
						Книги
					</Link>{" "}
				</div>
				<div className="flex items-center gap-x-2">
					<Button variant="outline" size="icon" onClick={handleToggleTheme}>
						<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						<span className="sr-only">Toggle theme</span>
					</Button>
					<Authenticated>
						<Button onClick={() => signOut()}>Выйти</Button>
					</Authenticated>
					<Unauthenticated>
						<Button>
							<Link to="/auth" className="[&.active]:font-bold">
								Войти
							</Link>
						</Button>
					</Unauthenticated>
				</div>
			</div>
			<div className="px-3">
				<hr />
			</div>
			<Outlet />
			<TanStackRouterDevtools />
		</div>
	);
}
