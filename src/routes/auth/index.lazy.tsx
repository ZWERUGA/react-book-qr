import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import { Unauthenticated, AuthLoading } from "convex/react";
import { SignUp } from "@/features/auth/components/sign-up";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/auth/")({
	component: Auth,
});

function Auth() {
	const { signIn } = useAuthActions();

	return (
		<div className="flex justify-center">
			<AuthLoading>Loading...</AuthLoading>
			<Unauthenticated>
				<div className="flex flex-col justify-center items-center">
					<div>
						<Button onClick={() => signIn("github")}>
							Sign in with Github
						</Button>
						<Button onClick={() => signIn("google")}>
							Sign in with Google
						</Button>
						<Button onClick={() => signIn("yandex")}>
							Sign in with Yandex
						</Button>
					</div>

					<Separator className="mt-2" />

					<SignUp />
				</div>
			</Unauthenticated>
		</div>
	);
}
