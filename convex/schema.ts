import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  ...authTables,

  users: defineTable({
    name: v.optional(v.string()),
    image: v.optional(v.id("_storage")),
    email: v.optional(v.string()),
    emailVerificationTime: v.optional(v.number()),
    phone: v.optional(v.string()),
    phoneVerificationTime: v.optional(v.number()),
    isAnonymous: v.optional(v.boolean()),
    role: v.optional(v.string()),
  }).index("email", ["email"]),

  books: defineTable({
    authors: v.optional(v.array(v.string())),
    description: v.optional(v.string()),
    identifier: v.optional(v.string()),
    imageLink: v.optional(v.string()),
    language: v.optional(v.string()),
    pageCount: v.optional(v.number()),
    publishedDate: v.optional(v.string()),
    publisher: v.optional(v.string()),
    title: v.optional(v.string()),
  })
    .index("by_author", ["authors"])
    .index("by_title", ["title"]),
});
