// import { NextResponse } from "next/server";
// import clientPromise from "@/lib/mongodb";
// export async function GET(req, { params }) {
//     const code = params.code.toLowerCase();
//     // Skip if path matches our known routes
//     const reserved = new Set(["about", "contact", "privacy", "terms",
//         "shorten", "api"]);
//     if (reserved.has(code)) {
//         return NextResponse.next();
//         14
//     }
//     const client = await clientPromise;
//     const db = client.db(process.env.MONGODB_DB || "bitlinks");
//     const col = db.collection("url");
//     const doc = await col.findOne({ shortCode: code });
//     if (!doc) {
//         return new Response("Not Found", { status: 404 });
//     }
//     // Increment click count (fire and forget)
//     col.updateOne({ _id: doc._id }, { $inc: { clicks: 1 } }).catch(() => { });
//     // Temporary redirect
//     return NextResponse.redirect(doc.originalUrl, { status: 302 });
// }

import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { sanitizeAlias } from "@/utils/validators";  // ✅ Sanitize Alias if needed


// // ✅ Safe alias regex — same as validators.js
// const SAFE_ALIAS_REGEX = /^[A-Za-z0-9@._-]+$/;

export async function GET(req, context) {
    // Await করতে হবে
    const { code } = await context.params;

    // এখন থেকে code কে পরিবর্তন করবো না
    // const shortCode = code;
    let shortCode = code;

    // Reserved routes এড়িয়ে যাওয়া
    const reserved = new Set(["about", "contact", "privacy", "terms", "shorten", "api"]);

    if (reserved.has(shortCode)) {
        return NextResponse.next();
    }

    // Optional: Sanitize the shortCode if needed (if alias contains special characters)
    shortCode = sanitizeAlias(shortCode);
    // ✅ Safe alias regex check (prevent invalid patterns like #test!)
    // if (!SAFE_ALIAS_REGEX.test(shortCode)) {
    //     return new Response("Invalid short URL", { status: 404 });
    // }
    try {
        // MongoDB connect
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB || "bitlinks");
        const col = db.collection("url");

        // Shortcode খোঁজা — case-sensitive query
        const doc = await col.findOne({ shortCode });

        if (!doc) {
            return new Response("Not Found", { status: 404 });
        }

        // Click count আপডেট (fire and forget)
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
// Last updated cod:- (Have to check)

// import { shortenSchema, sanitizeAlias } from "@/utils/validators";
// import clientPromise from "@/lib/mongodb"; // যদি DB লাগে, এটা আগের মতো রাখুন
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     const { url, alias } = body;

//     // Validate inputs using schema
//     const parsed = shortenSchema.parse({ url, alias });

//     const client = await clientPromise;
//     const db = client.db("bitlinks");
//     const collection = db.collection("url");

//     // যদি alias থাকে তবে চেক করব taken কিনা
//     if (parsed.alias) {
//       const exists = await collection.findOne({ shorturl: parsed.alias });
//       if (exists) {
//         return NextResponse.json(
//           { error: "Alias is already taken" },
//           { status: 409 }
//         );
//       }
//     }

//     // Random alias তৈরি হবে যদি custom alias না থাকে
//     const shortId = parsed.alias || sanitizeAlias(Math.random().toString(36).substring(2, 8));

//     await collection.insertOne({
//       url: parsed.url,
//       shorturl: shortId,
//       createdAt: new Date(),
//     });

//     return NextResponse.json({
//       shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${shortId}`,
//       originalUrl: parsed.url,
//       alias: parsed.alias || null,
//     });
//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: err.message || "Something went wrong" },
//       { status: 400 }
//     );
//   }
// }
