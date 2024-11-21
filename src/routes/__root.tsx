import { Toaster } from "@/components/ui/toaster";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
	component: Root,
});

function Root() {
	return (
		<div className="container flex flex-col mx-auto h-screen">
			<Toaster />
			<Outlet />
			<TanStackRouterDevtools />
		</div>
	);
}
