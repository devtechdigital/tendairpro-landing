import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
  path: "/submit",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    // CORS headers for browser requests
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    try {
      const body = await request.json();
      
      // Validate required fields
      if (!body.type || !body.firstName || !body.lastName || !body.email) {
        return new Response(
          JSON.stringify({ success: false, error: "Missing required fields" }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      // Call the mutation
      const result = await ctx.runMutation(api.submissions.submitInterest, {
        type: body.type,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        organisation: body.organisation || undefined,
        company: body.company || undefined,
        role: body.role || undefined,
        industry: body.industry || undefined,
        volume: body.volume || undefined,
        painPoints: body.painPoints || undefined,
      });

      return new Response(
        JSON.stringify({ success: true, id: result.id }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    } catch (error) {
      console.error("Submission error:", error);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to save submission" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
  }),
});

// Handle CORS preflight
http.route({
  path: "/submit",
  method: "OPTIONS",
  handler: httpAction(async () => {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }),
});

export default http;
