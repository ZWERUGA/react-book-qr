import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Yandex from "@auth/core/providers/yandex";
import { DataModel } from "./_generated/dataModel";
import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";
import { findUserByEmail } from "./users";

const customPassword = Password<DataModel>({
	profile(params) {
		return {
			email: params.email as string,
			name: params.name as string,
			role: params.role as string,
		};
	},
});

export const { auth, signIn, signOut, store } = convexAuth({
	providers: [customPassword, GitHub, Google, Yandex],
	callbacks: {
		async afterUserCreatedOrUpdated(ctx, args) {
			if (args.type === "oauth") {
				await ctx.db.patch<"users">(args.userId, { role: "user" });
			}
		},
	},
});
