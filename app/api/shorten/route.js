import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { shortenSchema, sanitizeAlias } from "@/utils/validators"; // ✅ Import sanitizeAlias
import { customAlphabet, nanoid } from "nanoid";

// Safe alias regex — allow only letters, numbers, @, _, . and -
// Remove the regex here as it's already used in sanitizeAlias
// const SAFE_ALIAS_REGEX = /^[A-Za-z0-9@._-]+$/;

const alpha = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 7);

export async function POST(req) {
    try {
        // Request payload parsing
        // Step 1: Validate request body using Zod
        const payload = await req.json();
        const parsed = shortenSchema.parse(payload); // Validates URL and alias
        const url = parsed.url;
        // এখানে lowercase বাদ দিলাম — custom alias এখন যেমন লিখবে তেমন সেভ হবে
        // Alias sanitization and validation
        // let alias = parsed.alias;  // No need for .trim() here as it's already done in zod and also No need for the default empty string, as it's handled by zod

        // Sanitize alias using sanitizeAlias function (sanitizeAlias already checks the safe alias regex)
        // alias = sanitizeAlias(alias);
        // Step 2: Alias handle
        let alias = parsed.alias ? sanitizeAlias(parsed.alias) : "";


        // If alias is empty after sanitization or if it's invalid, return an error
        // if (!alias) {
        //     return NextResponse.json({ error: "Invalid alias format." }, { status: 400 });
        // }

        // যদি ইউজার custom alias দেয় → sanitize + validate
        if (parsed.alias) {
            // sanitize করার পর alias ফাঁকা হয়ে গেলে মানে invalid ছিলো → error দাও
            if (!alias || alias.length === 0) {
                return NextResponse.json(
                    { error: "❌ Invalid alias format." },
                    { status: 400 }
                );
            }
        } else {
            // যদি ইউজার alias না দেয় → auto-generate alias
            alias = alpha();
        }

        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || "bitlinks");
        const col = db.collection("url");
        if (alias) {
            // Ensure alias not taken
            // Check if alias is already taken
            const exists = await col.findOne({ shortCode: alias });

            if (exists) {
                return NextResponse.json({ error: "❌ Alias is already taken." }, {
                    status: 409
                });
            }
        } else {
            // Generate unique code if no alias is provided
            // Generate unique lowercase code (auto-generated হলে lowercase থাকবে)
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
        return NextResponse.json({ shortUrl, code: alias });
    } catch (err) {
        // zod validation error or unexpected
        const message = err?.issues?.[0]?.message || err.message || "Invalid Request";
        return NextResponse.json({ error: message }, { status: 400 });
    }
}

// ✅ নতুন DELETE হ্যান্ডলার
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