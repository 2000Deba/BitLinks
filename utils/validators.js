import { z } from "zod";

export const allowedCharsRegex = /^[A-Za-z0-9@_-]+$/;

// --- Sanitize Alias Function ---
export function sanitizeAlias(input = "") {
  return input
    .replace(/[^A-Za-z0-9@_-]/g, "")
    .replace(/[-_]{2,}/g, "-")
    .replace(/^[-_@]+|[-_@]+$/g, "")
    .slice(0, 50);
}

// --- URL Shorten Schema ---
export const shortenSchema = z.object({
  url: z
    .url({ message: "Please provide a valid URL" })
    .nonempty("URL is required"),

  alias: z
    .string()
    .trim()
    .max(50, { message: "Alias can't be longer than 50 characters" })
    .regex(allowedCharsRegex, {
      message:
        "Alias can only contain letters, numbers, dash (-), underscore (_), and at (@)",
    })
    .optional()
    .or(z.literal("")) // Allow empty alias if not provided
});
