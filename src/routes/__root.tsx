import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
	component: Root,
});

function Root() {
	const { theme, setTheme } = useTheme();

	const handleToggleTheme = () => {
		return theme === "light" ? setTheme("dark") : setTheme("light");
	};

	return (
		<div className="container mx-auto">
			<div className="flex justify-between p-3">
				<div className="gap-x-2 items-center flex">
					<Link to="/" className="[&.active]:font-bold">
						Главная
					</Link>{" "}
					<Link to="/books" className="[&.active]:font-bold">
						Книги
					</Link>{" "}
				</div>
				<Button variant="outline" size="icon" onClick={handleToggleTheme}>
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools />
		</div>
	);
}
