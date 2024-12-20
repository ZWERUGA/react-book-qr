import { Unauthenticated } from "convex/react";
import { createFileRoute } from "@tanstack/react-router";
import AuthForm from "@/features/auth/auth-form";

export const Route = createFileRoute("/auth/sign-up")({
  component: SignUp,
});

function SignUp() {
  return (
    <div className="flex flex-col gap-y-2 h-full justify-center items-center">
      <Unauthenticated>
        <AuthForm title="Регистрация" step="signUp" />
      </Unauthenticated>
    </div>
  );
}
