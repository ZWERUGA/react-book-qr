import { Link } from "@tanstack/react-router";

export function AuthRequire() {
  return (
    <div className="flex justify-center items-center h-full">
      <p>
        <Link
          to="/auth/sign-in"
          className="underline hover:text-slate-300 hover:transition-colors"
        >
          Войдите в систему
        </Link>{" "}
        или
        <Link
          to="/auth/sign-up"
          className="underline hover:text-slate-300 hover:transition-colors"
        >
          {" "}
          зарегистрируйтесь
        </Link>
      </p>
    </div>
  );
}
