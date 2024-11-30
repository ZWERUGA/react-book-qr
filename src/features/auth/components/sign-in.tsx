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
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import { SubmitButton } from "@/components/submit-button";
import { PasswordInput } from "@/components/ui/password-input";
import { useRouter } from "@tanstack/react-router";

interface ISignInProps {
  setError: (text: string) => void;
}

export function SignIn({ setError }: ISignInProps) {
  const [isLoading, setLoading] = useState<boolean>(false);

  const { toast } = useToast();
  const { signIn } = useAuthActions();

  const router = useRouter();

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

        router.history.back();
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

        <Separator className="my-1" />
        <SubmitButton isLoading={isLoading} />
      </form>
    </Form>
  );
}
