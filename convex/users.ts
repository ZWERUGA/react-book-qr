import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query, QueryCtx } from "./_generated/server";

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (userId === null) {
      return null;
    }

    const user = await ctx.db.get(userId);

    if (user === null) {
      return null;
    }

    if (!user.image) {
      return {
        ...user,
        imageUrl: "",
      };
    }

    const imageUrl = await ctx.storage.getUrl(user.image);

    return {
      ...user,
      imageUrl: imageUrl,
    };
  },
});

export const findUserByEmail = (ctx: QueryCtx, email?: string) => {
  return ctx.db
    .query("users")
    .filter((q) => q.eq(q.field("email"), email))
    .unique();
};

export const update = mutation({
  args: {
    name: v.string(),
    image: v.optional(v.id("_storage")),
    phone: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return new Error("Несанкционированный доступ");
    }

    await ctx.db.patch(userId, {
      name: args.name,
      image: args.image,
      phone: args.phone,
    });

    return await ctx.db.get(userId);
  },
});
