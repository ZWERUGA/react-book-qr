import { z } from "zod";

export const profileSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Имя должно содержать минимум 5 символов и не более 30.",
    })
    .max(30, {
      message: "Имя должно содержать минимум 5 символов и не более 30.",
    }),
});
