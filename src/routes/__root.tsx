import { LuMoon, LuSun } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

import { useAuthActions } from "@convex-dev/auth/react";
import { Authenticated, Unauthenticated } from "convex/react";

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
		<div className="container flex flex-col mx-auto h-screen">
			<div className="flex justify-between p-3">
				<div className="flex items-center gap-x-2">
					<Link to="/" className="[&.active]:font-bold">
						Главная
					</Link>{" "}
					<Link to="/books" className="[&.active]:font-bold">
						Книги
					</Link>{" "}
				</div>
				<div className="flex items-center gap-x-2">
					<Button variant="outline" size="icon" onClick={handleToggleTheme}>
						<LuSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<LuMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					</Button>
					<Authenticated>
						<Button onClick={() => signOut()}>Выйти</Button>
					</Authenticated>
					<Unauthenticated>
						<Link to="/auth/sign-in">
							<Button>Войти</Button>
						</Link>
						<Link to="/auth/sign-up">
							<Button variant="outline">Зарегистрироваться</Button>
						</Link>
					</Unauthenticated>
				</div>
			</div>
			<hr />
			<Outlet />
			<TanStackRouterDevtools />
		</div>
	);
}
