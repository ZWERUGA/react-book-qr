import { query, QueryCtx } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const currentUser = query({
	args: {},
	handler: async (ctx) => {
		const userId = await getAuthUserId(ctx);

		if (userId === null) {
			return null;
		}

		return await ctx.db.get(userId);
	},
});

export const findUserByEmail = (ctx: QueryCtx, email?: string) => {
	return ctx.db
		.query("users")
		.filter((q) => q.eq(q.field("email"), email))
		.unique();
};
