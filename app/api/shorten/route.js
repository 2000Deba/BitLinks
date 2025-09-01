import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { shortenSchema, sanitizeAlias } from "@/utils/validators"; // Import sanitizeAlias
import { customAlphabet, nanoid } from "nanoid";

const alpha = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 7);

export async function POST(req) {
    try {
        // Request payload parsing
        // Step 1: Validate request body using Zod
        const payload = await req.json();
        const parsed = shortenSchema.parse(payload); // Validates URL and alias
        const url = parsed.url;
        // Alias sanitization and validation
        // Step 2: Alias handle
        let alias = parsed.alias ? sanitizeAlias(parsed.alias) : "";


        // If alias is empty after sanitization or if it's invalid, return an error
        if (parsed.alias) {
            if (!alias || alias.length === 0) {
                return NextResponse.json(
                    { error: "❌ Invalid alias format." },
                    { status: 400 }
                );
            }
        } else {
            alias = alpha();
        }

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || "bitlinks");
        const col = db.collection("url");
        if (alias) {
            // Check if alias is already taken
            const exists = await col.findOne({ shortCode: alias });

            if (exists) {
                return NextResponse.json({ error: "❌ Alias is already taken." }, {
                    status: 409
                });
            }
        } else {
            // Generate unique code if no alias is provided
            do {
                alias = alpha().toLowerCase(); // Generate lowercase random code
            } while (await col.findOne({ shortCode: alias }));
        }
        const now = new Date();
        await col.insertOne({
            originalUrl: url,
            shortCode: alias,
            createdAt: now,
            clicks: 0,
        });
        // Build absolute short URL
        const headers = req.headers;
        const site = process.env.NEXT_PUBLIC_SITE_URL || `${headers.get("xforwarded-proto") || "http"}://${headers.get("host")}`;
        const shortUrl = `${site.replace(/\/$/, "")}/${alias}`;
        return NextResponse.json({ shortUrl, originalUrl:url, alias });
    } catch (err) {
        // zod validation error or unexpected
        const message = err?.issues?.[0]?.message || err.message || "Invalid Request";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}


export async function DELETE(req) {
    try {
        const { searchParams } = new URL(req.url);
        const alias = sanitizeAlias(searchParams.get("alias"));

        if (!alias) {
            return NextResponse.json({ error: "Alias is required." }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || "bitlinks");
        const col = db.collection("url");

        const result = await col.deleteOne({ shortCode: alias });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Short URL not found." }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Short URL deleted successfully." });
    } catch (err) {
        console.error("Delete Error:", err);
        return NextResponse.json({ error: "Failed to delete short URL." }, { status: 500 });
    }
}