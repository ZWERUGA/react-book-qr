import { query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const getAll = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		const books = await ctx.db.query("books").paginate(args.paginationOpts);

		return books;
	},
});
