import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { SignIn } from "./components/sign-in";
import { SignUp } from "./components/sign-up";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { LuArrowLeftFromLine } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import { FaGithub, FaGoogle, FaYandex } from "react-icons/fa";

type TStep = "signIn" | "signUp";

interface IAuthFormProps {
	title: string;
	step: TStep;
}

export default function AuthForm({ title, step }: IAuthFormProps) {
	const [error, setError] = useState<string>("");

	const { signIn } = useAuthActions();

	return (
		<>
			<Link
				to="/"
				className="flex items-center gap-2 text-lg border-primary border-b"
			>
				<LuArrowLeftFromLine />
				<span>На главную</span>
			</Link>

			<div className="flex flex-col items-center border rounded-md p-3 w-[520px] sm:w-3/4">
				<h1 className="text-[40px]">{title}</h1>
				<p className="text-sm text-gray-400">
					Используйте электронную почту или другой сервис, чтобы продолжить
				</p>
				{error && (
					<div className="flex justify-center mt-2 p-2 border w-full bg-destructive rounded-md relative">
						{error}
						<IoIosClose
							onClick={() => setError("")}
							className="absolute right-1 top-1/2 -translate-y-1/2 text-4xl cursor-pointer"
						/>
					</div>
				)}
				<Separator className="mt-3 mb-3" />

				{step === "signIn" ? (
					<SignIn setError={setError} />
				) : (
					<SignUp setError={setError} />
				)}

				<div className="mt-4 mb-7">
					{step === "signIn"
						? "У вас нет учетной записи? "
						: "У вас уже есть учетная запись? "}
					<Link
						to={step === "signIn" ? "/auth/sign-up" : "/auth/sign-in"}
						className="underline underline-offset-4"
					>
						{step === "signIn" ? "Зарегистрироваться" : "Войти"}
					</Link>
				</div>
				<div className="mb-6 w-full flex flex-col items-center justify-center relative">
					<p className="absolute bg-background px-5">или</p>
					<Separator />
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
		</>
	);
}
