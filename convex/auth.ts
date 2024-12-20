import { internal } from "./_generated/api";
import GitHub from "@auth/core/providers/github";
import Google from "@auth/core/providers/google";
import Yandex from "@auth/core/providers/yandex";
import { DataModel } from "./_generated/dataModel";
import { convexAuth } from "@convex-dev/auth/server";
import { Password } from "@convex-dev/auth/providers/Password";

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
        const { userId } = args;

        const user = await ctx.db.get(userId);
        const imageUrl = user.image;

        await ctx.scheduler.runAfter(0, internal.images.generateAndStore, {
          userId,
          imageUrl,
        });

        await ctx.db.patch<"users">(args.userId, { role: "user" });
      }
    },
  },
});
