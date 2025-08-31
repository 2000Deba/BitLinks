// import { z } from "zod";


// export const shortenSchema = z.object({
// url: z.string().url({ message: "Please enter a valid URL (with http/https)." }),
// alias: z
// .string()
// .trim()
// .toLowerCase()
// .regex(/^[a-z0-9-]{3,30}$/i, {
// message: "Alias must be 3-30 chars, letters, numbers, hyphen.",
// })
// .optional()
// .or(z.literal(""))
// });

// import { z } from "zod";

// export const shortenSchema = z.object({
//   url: z
//     .string()
//     .url({ message: "Please provide a valid URL" })
//     .nonempty("URL is required"),
  
//   // alias optional, allow capital letters, special characters, dash, underscore etc.
//   alias: z
//     .string()
//     .trim()
//     .max(50, { message: "Alias can't be longer than 50 characters" })
//     .regex(/^[\w\-!@#$%^&*()+=,.?'"~]+$/i, {
//       message:
//         "Alias can only contain letters, numbers, dashes, underscores, and some special characters",
//     })
//     .optional()
//     .or(z.literal("")) // Allow empty alias if not provided
// });

// import { z } from "zod";

// // --- Sanitize Alias Function ---
// export function sanitizeAlias(input = "") {
//   return input
//     // শুধু allowed characters রাখবে
//     .replace(/[^A-Za-z0-9@_-]/g, "")
//     // একাধিক dash বা underscore হলে একটিতে কমিয়ে দেবে
//     .replace(/[-_]{2,}/g, "-")
//     // শুরুর বা শেষের dash/underscore মুছে ফেলবে
//     .replace(/^[-_]+|[-_]+$/g, "")
//     // সর্বাধিক 50 ক্যারেক্টার লিমিট
//     .slice(0, 50);
// }

// // --- URL Shorten Schema ---
// export const shortenSchema = z.object({
//   url: z
//     .string()
//     .url({ message: "Please provide a valid URL" })
//     .nonempty("URL is required"),

//   // Alias optional, safe characters only: A-Z, a-z, 0-9, dash (-), underscore (_), at (@)
//   alias: z
//     .string()
//     .trim()
//     .max(50, { message: "Alias can't be longer than 50 characters" })
//     .regex(/^[A-Za-z0-9@_-]+$/, {
//       message:
//         "Alias can only contain letters, numbers, dash (-), underscore (_), and at (@)",
//     })
//     .optional()
//     .or(z.literal("")) // Allow empty alias if not provided
// });



// Last updated codde:- (Have to check)
import { z } from "zod";

// Allowed characters Regex (Client + Server একই রুল)
export const allowedCharsRegex = /^[A-Za-z0-9@_-]+$/;

// --- Sanitize Alias Function ---
export function sanitizeAlias(input = "") {
  return input
    // শুধু allowed characters রাখবে
    .replace(/[^A-Za-z0-9@_-]/g, "")
    // একাধিক dash, underscore হলে একটিতে কমিয়ে দেবে
    .replace(/[-_]{2,}/g, "-")
    // শুরুর বা শেষের dash/underscore/at (@) মুছে ফেলবে
    .replace(/^[-_@]+|[-_@]+$/g, "")
    // সর্বাধিক 50 ক্যারেক্টার লিমিট
    .slice(0, 50);
}

// --- URL Shorten Schema ---
export const shortenSchema = z.object({
  url: z
    // .string() // Works in zod 3.x version but in zod 4.x there is no need to use .string()
    .url({ message: "Please provide a valid URL" })
    .nonempty("URL is required"),

  // Alias optional, safe characters only: A-Z, a-z, 0-9, dash (-), underscore (_), at (@)
  alias: z
    .string()
    .trim()
    .max(50, { message: "Alias can't be longer than 50 characters" })
    .regex(allowedCharsRegex, {
      message:
        "Alias can only contain letters, numbers, dash (-), underscore (_), dot (.), and at (@)",
    })
    .optional()
    .or(z.literal("")) // Allow empty alias if not provided
});
