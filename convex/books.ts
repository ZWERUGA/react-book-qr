import { v } from "convex/values";
import { query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const getAll = query({
	args: { paginationOpts: paginationOptsValidator },
	handler: async (ctx, args) => {
		const books = await ctx.db.query("books").paginate(args.paginationOpts);

		return books;
	},
});

export const getById = query({
	args: { bookId: v.id("books") },
	handler: async (ctx, args) => {
		return await ctx.db.get(args.bookId);
	},
});
