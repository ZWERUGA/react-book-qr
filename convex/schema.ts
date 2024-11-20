import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
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
