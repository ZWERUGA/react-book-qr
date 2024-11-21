import { LuMoon, LuSun } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { CustomLink } from "@/components/ui/customLink";
import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated } from "convex/react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
	component: RouteComponent,
});

function RouteComponent() {
	const { theme, setTheme } = useTheme();
	const { signOut } = useAuthActions();

	const handleToggleTheme = () => {
		return theme === "light" ? setTheme("dark") : setTheme("light");
	};

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
					<Button variant="outline" size="icon" onClick={handleToggleTheme}>
						<LuSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<LuMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					</Button>
					<Authenticated>
						<Button onClick={() => signOut()}>Выйти</Button>
					</Authenticated>
					<Unauthenticated>
						<CustomLink to="/auth/sign-in">Войти</CustomLink>
						<CustomLink to="/auth/sign-up" variant="outline">
							Зарегистрироваться
						</CustomLink>
					</Unauthenticated>
				</div>
			</div>
			<hr />
			<Outlet />
		</>
	);
}
