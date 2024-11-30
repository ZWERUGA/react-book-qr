import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
  args: {
    bookId: v.id("books"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return;
    }

    const rentId = await ctx.db
      .query("rents")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.eq(q.field("bookId"), args.bookId)
        )
      )
      .unique();

    if (rentId) {
      return;
    }

    return await ctx.db.insert("rents", {
      userId: userId,
      bookId: args.bookId,
      confirmed: false,
    });
  },
});

export const getById = query({
  args: {
    bookId: v.id("books"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    return await ctx.db
      .query("rents")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), userId),
          q.eq(q.field("bookId"), args.bookId)
        )
      )
      .unique();
  },
});
