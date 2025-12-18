import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submitInterest = mutation({
  args: {
    type: v.union(v.literal("buyer"), v.literal("supplier")),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    organisation: v.optional(v.string()),
    company: v.optional(v.string()),
    role: v.optional(v.string()),
    industry: v.optional(v.string()),
    volume: v.optional(v.string()),
    painPoints: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const submissionId = await ctx.db.insert("submissions", {
      ...args,
      timestamp: Date.now(),
    });
    return { success: true, id: submissionId };
  },
});

