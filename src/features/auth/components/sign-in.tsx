import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { signInSchema } from "../zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useNavigate } from "@tanstack/react-router";

interface ISignInProps {
  setError: (text: string) => void;
}

export function SignIn({ setError }: ISignInProps) {
  const [isLoading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const navigate = useNavigate();
  const { signIn } = useAuthActions();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    setLoading(true);
    signIn("password", {
      email: values.email,
      password: values.password,
      flow: "signIn",
    })
      .then(() => {
        toast({
          title: "Вход в систему",
          description: "Вы успешно вошли в систему",
        });
        navigate({ to: "/" });
      })
      .catch(() => setError("Ошибка авторизации"))
      .finally(() => setLoading(false));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-y-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Электронная почта..."
                  className="text-xs sm:text-base"
                  required
                  autoComplete="true"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Пароль</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Пароль..."
                  required
                  {...field}
                  className="text-xs sm:text-base"
                  autoComplete="true"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="mt-1" />
        <Button disabled={isLoading} type="submit" className="mt-1">
          {isLoading && <Loader className="animate-spin" />}
          {isLoading ? "Подождите..." : "Продолжить"}
        </Button>
      </form>
    </Form>
  );
}
