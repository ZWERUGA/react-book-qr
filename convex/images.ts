import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { internalAction, internalMutation } from "./_generated/server";

export const generateAndStore = internalAction({
  args: {
    userId: v.id("users"),
    imageUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const { userId, imageUrl } = args;

    const response = await fetch(imageUrl);
    const image = await response.blob();

    const storageId: Id<"_storage"> = await ctx.storage.store(image);

    await ctx.runMutation(internal.images.storeResult, {
      userId,
      storageId,
    });
  },
});

export const storeResult = internalMutation({
  args: {
    userId: v.id("users"),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const { userId, storageId } = args;
    await ctx.db.patch(userId, { image: storageId });
  },
});
