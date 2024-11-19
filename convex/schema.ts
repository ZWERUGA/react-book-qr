import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
	books: defineTable({
		authors: v.union(v.null(), v.array(v.string())),
		description: v.union(v.null(), v.string()),
		identifier: v.union(v.null(), v.string()),
		imageLink: v.union(v.null(), v.string()),
		language: v.string(),
		pageCount: v.union(v.null(), v.float64()),
		publishedDate: v.union(v.null(), v.string()),
		publisher: v.union(v.null(), v.string()),
		title: v.string(),
	})
		.index('by_author', ['authors'])
		.index('by_title', ['title'])
});
