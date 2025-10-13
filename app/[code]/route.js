import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { sanitizeAlias } from "@/utils/validators";  // Sanitize Alias if needed

export async function GET(req, context) {
        const { code } = await context.params;
    let shortCode = code;

        const reserved = new Set(["about", "contact", "privacy", "terms", "shorten", "api"]);

    if (reserved.has(shortCode)) {
        return NextResponse.next();
    }

    // Sanitize the shortCode if needed (if alias contains special characters)
    shortCode = sanitizeAlias(shortCode);
        try {
        // MongoDB connect
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || "bitlinks");
        const col = db.collection("url");

        // Shortcode searching — case-sensitive query
        const doc = await col.findOne({ shortCode });

        if (!doc) {
            return new Response("Not Found", { status: 404 });
        }

        // Click count update (fire and forget)
        col.updateOne(
            { _id: doc._id },
            { $inc: { clicks: 1 } }
        ).catch((err) => console.error("Failed to increment click count:", err));

        // Redirect
        return NextResponse.redirect(doc.originalUrl, { status: 302 });
    }
    catch (err) {
        console.log("Error handling URL:", err);
        return new Response("Internal Server Error", { status: 500 })
    }
}