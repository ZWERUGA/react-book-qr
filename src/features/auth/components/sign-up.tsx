import { z } from "zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "../zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import { PasswordInput } from "@/components/ui/password-input";

export function SignUp() {
	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: "",
			name: "",
			password: "",
			isAdminCode: "",
		},
	});

	const isAdmin = form.watch(["isAdmin"])[0];

	const { signIn } = useAuthActions();

	const onSubmit = (values: z.infer<typeof signUpSchema>) => {
		signIn("password", {
			email: values.email,
			name: values.name,
			password: values.password,
			role: values.isAdmin ? "admin" : "user",
			flow: "signUp",
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
					name="name"
					render={({ field }) => (
						<FormItem className="space-y-1">
							<FormLabel>Имя пользователя</FormLabel>
							<FormControl>
								<Input
									type="text"
									placeholder="Имя пользователя..."
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
								<PasswordInput placeholder="Пароль..." {...field} required />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Separator />

				<FormField
					control={form.control}
					name="isAdmin"
					render={({ field }) => (
						<FormItem className="flex items-center justify-between rounded-md border space-y-0 p-4">
							<div className="space-y-0.5">
								<FormLabel className="text-base">Администратор</FormLabel>
								<FormDescription>
									Необходимо ввести служебный код
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>

				{isAdmin && (
					<FormField
						control={form.control}
						name="isAdminCode"
						render={({ field }) => (
							<FormItem className="space-y-1">
								<FormLabel>Служебный код</FormLabel>
								<FormControl>
									<Input placeholder="Код..." {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				)}
				<Button type="submit" className="mt-2">
					Продолжить
				</Button>
			</form>
		</Form>
	);
}
