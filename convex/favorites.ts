import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getAllById = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) return null;

    const favorites = await ctx.db
      .query("favorites")
      .filter((q) => q.eq(q.field("userId"), userId))
      .collect();

    return favorites.map((favorite) => favorite.bookId);
  },
});

export const getById = query({
  args: {
    bookId: v.id("books"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) return null;

    return await ctx.db
      .query("favorites")
      .filter((q) =>
        q.and(
          q.eq(q.field("bookId"), args.bookId),
          q.eq(q.field("userId"), userId)
        )
      )
      .unique();
  },
});

export const add = mutation({
  args: {
    bookId: v.id("books"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return new Error("Несанкционированный доступ");
    }

    const favoriteId = await ctx.db.insert("favorites", {
      userId: userId,
      bookId: args.bookId,
    });

    return favoriteId;
  },
});

export const remove = mutation({
  args: {
    favoriteId: v.id("favorites"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return new Error("Несанкционированный доступ");
    }

    const favoriteId = await ctx.db.get(args.favoriteId);

    if (!favoriteId) {
      return new Error("Книга не найдена");
    }

    await ctx.db.delete(args.favoriteId);
  },
});
