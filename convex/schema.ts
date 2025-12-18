import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  submissions: defineTable({
    type: v.union(v.literal("buyer"), v.literal("supplier")),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    organisation: v.optional(v.string()), // buyer field
    company: v.optional(v.string()), // supplier field
    role: v.optional(v.string()), // buyer only
    industry: v.optional(v.string()), // supplier only
    volume: v.optional(v.string()),
    painPoints: v.optional(v.string()),
    timestamp: v.number(),
  }).index("by_email", ["email"])
    .index("by_type", ["type"]),
});

