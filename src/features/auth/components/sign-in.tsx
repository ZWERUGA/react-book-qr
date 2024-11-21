import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import { PasswordInput } from "@/components/ui/password-input";

export function SignIn() {
	const { signIn } = useAuthActions();

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof signInSchema>) => {
		signIn("password", {
			email: values.email,
			password: values.password,
			flow: "signIn",
			redirectTo: "/",
		});
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
									required
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
								<PasswordInput placeholder="Пароль..." required {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Separator className="mt-1" />
				<Button variant="default" type="submit" className="mt-1">
					Продолжить
				</Button>
			</form>
		</Form>
	);
}
