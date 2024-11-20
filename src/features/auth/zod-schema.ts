import { format } from "date-fns";
import { z } from "zod";

export const signUpSchema = z
	.object({
		email: z
			.string()
			.email({ message: "Введите корректный адрес электронной почты." }),
		name: z
			.string()
			.min(5, {
				message: "Имя должно содержать минимум 5 символов и не более 30.",
			})
			.max(30, {
				message: "Имя должно содержать минимум 5 символов и не более 30.",
			}),
		password: z
			.string()
			.min(6, { message: "Пароль должен содержать минимум 6 символов." }),
		isAdmin: z.boolean().default(false),
		isAdminCode: z.string().optional(),
	})
	.refine(
		(obj) =>
			obj.isAdmin !== true ||
			format(new Date(), "ddMMyyyy") === obj.isAdminCode,
		{
			message:
				"Некорректный код. Пожалуйста, проверьте его и попробуйте снова.",
			path: ["isAdminCode"],
		}
	);
