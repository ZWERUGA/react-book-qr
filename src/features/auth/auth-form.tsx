import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { SignIn } from "./components/sign-in";
import { SignUp } from "./components/sign-up";
import { Link } from "@tanstack/react-router";
import { LuArrowLeftFromLine } from "react-icons/lu";
import { Separator } from "@/components/ui/separator";
import { SocialButton } from "@/components/social-button";
import { FaGithub, FaGoogle, FaYandex } from "react-icons/fa";

type TStep = "signIn" | "signUp";

interface IAuthFormProps {
  title: string;
  step: TStep;
}

export default function AuthForm({ title, step }: IAuthFormProps) {
  const [error, setError] = useState<string>("");

  return (
    <div className="flex flex-col items-center gap-y-2 px-2">
      <Link
        to="/"
        className="flex items-center gap-2 text-lg border-primary border-b"
      >
        <LuArrowLeftFromLine />
        <span>На главную</span>
      </Link>

      <div className="flex flex-col items-center border rounded-md p-2 md:w-[520px] w-full">
        <h1 className="text-[30px] sm:text-[40px]">{title}</h1>
        <p className="text-xs sm:text-sm text-gray-400 text-center">
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

        <div className="mt-4 mb-7 flex gap-1 items-center sm:flex-row text-xs sm:text-base">
          {step === "signIn"
            ? "У вас нет учетной записи?"
            : "У вас уже есть учетная запись?"}
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
        <div className="flex flex-col sm:flex-row w-full justify-center gap-1">
          <SocialButton icon={FaGithub} provider="github" title="Github" />
          <SocialButton icon={FaGoogle} provider="google" title="Google" />
          <SocialButton icon={FaYandex} provider="yandex" title="Yandex" />
        </div>
      </div>
    </div>
  );
}
