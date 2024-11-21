import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import { Unauthenticated, AuthLoading } from "convex/react";
import { SignUp } from "@/features/auth/components/sign-up";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FaGithub, FaGoogle, FaYandex } from "react-icons/fa";

export const Route = createFileRoute("/auth/sign-up")({
	component: Auth,
});

function Auth() {
	const { signIn } = useAuthActions();

	return (
		<div className="flex h-full justify-center items-center">
			<AuthLoading>Loading...</AuthLoading>
			<Unauthenticated>
				<div className="flex flex-col items-center border rounded-md p-3 w-2/4">
					<h1 className="text-[40px]">Регистрация</h1>
					<p className="text-sm text-gray-400">
						Используйте электронную почту или другой сервис, чтобы продолжить
					</p>
					<Separator className="mt-3 mb-3" />
					<SignUp />
					<div className="mt-4 mb-7">
						У вас уже есть учетная запись?{" "}
						<Link
							to="/auth/sign-in"
							className="text-primary underline underline-offset-4"
						>
							Войти
						</Link>
					</div>
					<div className="mb-6 w-full flex flex-col items-center justify-center relative">
						<p className="absolute bg-background px-5">или</p>
						<Separator className="" />
					</div>
					<div className="flex w-full justify-center gap-3">
						<Button variant="outline" onClick={() => signIn("github")}>
							<FaGithub />
							Github
						</Button>
						<Button variant="outline" onClick={() => signIn("google")}>
							<FaGoogle />
							Google
						</Button>
						<Button variant="outline" onClick={() => signIn("yandex")}>
							<FaYandex />
							Yandex
						</Button>
					</div>
				</div>
			</Unauthenticated>
		</div>
	);
}
