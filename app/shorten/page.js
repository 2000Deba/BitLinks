"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Copy, Check, Trash2, Link2 as LinkIcon, Loader2, AlertCircle, } from "lucide-react";
import { allowedCharsRegex } from "@/utils/validators"; // Import regex

// --- tiny helpers ---
const isValidUrl = (val = "") => {
    try {
        const u = new URL(val);
        return !!u.protocol && !!u.host;
    } catch {
        return false;
    }
};

// --- lightweight toast ---
function Toast({ toast, onClose }) {
    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(onClose, 5000);
        return () => clearTimeout(t);
    }, [toast, onClose]);

    return (
        <AnimatePresence>
            {toast && (
                <motion.div
                    initial={{ x: 24, opacity: 0, y: -10 }}
                    animate={{ x: 0, opacity: 1, y: 0 }}
                    exit={{ x: 24, opacity: 0 }}
                    className={`fixed top-6 right-6 z-50 flex items-center gap-3 rounded-xl px-4 py-3 shadow-xl border ${toast.type === "error"
                        ? "bg-red-50/90 border-red-200 text-red-700"
                        : "bg-emerald-50/90 border-emerald-200 text-emerald-700"
                        }`}
                    role="status"
                    aria-live="polite">
                    {toast.type === "error" ? (
                        <AlertCircle className="w-5 h-5" />
                    ) : (
                        <Check className="w-5 h-5" />
                    )}
                    <span className="text-sm font-medium">{toast.message}</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default function ShortenPage() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [aliasError, setAliasError] = useState(""); // Added alias error state
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [copied, setCopied] = useState(null);

    // Load saved short links from localStorage
    useEffect(() => {
        const stored = localStorage.getItem("shortLinks");
        if (!stored) return;
        try {
            const parsed = JSON.parse(stored) ?? [];
            const filtered = parsed.filter(
                (it) => it?.shortUrl && String(it.shortUrl).trim() !== ""
            );
            setResults(filtered);
        } catch {
            localStorage.removeItem("shortLinks");
        }
    }, []);

    // derived states
    const canSubmit = isValidUrl(url) && !loading && (alias === "" || allowedCharsRegex.test(alias));

    // Real-time alias validation
    const handleAliasChange = (e) => {
        const value = e.target.value;
        setAlias(value);

        if (value === "" || allowedCharsRegex.test(value)) {
            setAliasError(""); // No error
        } else {
            setAliasError("❌ This character is not allowed!");
        }
    };

    // Submit form to generate short link
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isValidUrl(url)) {
            setToast({ type: "error", message: "Please enter a valid URL (https://…)" });
            return;
        }

        if (alias && !allowedCharsRegex.test(alias)) {
            setToast({ type: "error", message: "Alias contains invalid characters!" });
            return;
        }

        setLoading(true);
        setToast(null);

        try {
            const r = await fetch("/api/shorten", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: url.trim(), alias: alias }),
            });
            const data = await r.json();

            if (!r.ok) throw new Error(data?.error || "Failed to create link");

            if (data?.shortUrl && data.shortUrl.trim() !== "") {
                const updated = [
                    {
                        shortUrl: data.shortUrl,
                        originalUrl: data.originalUrl || url.trim(),
                        alias: data.alias || alias || undefined,
                        createdAt: Date.now(),
                    },
                    ...results,
                ];
                setResults(updated);
                localStorage.setItem("shortLinks", JSON.stringify(updated));
            }

            setUrl("");
            setAlias("");
            setToast({ type: "success", message: "Short link created 🎉" });
        } catch (err) {
            setToast({ type: "error", message: err.message || "Something went wrong" });
        } finally {
            setLoading(false);
        }
    };

    // Delete a single short link
    const deleteLink = async (shortUrl) => {
        try {
            const alias = shortUrl.split("/").pop();

            const res = await fetch(`/api/shorten?alias=${alias}`, { method: "DELETE" });  // Delete from Database

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || "Failed to delete");

            const filtered = results.filter((item) => item.shortUrl !== shortUrl);  // Delete from localStorage
            setResults(filtered);
            localStorage.setItem("shortLinks", JSON.stringify(filtered));
            setToast({ type: "success", message: "Deleted" });
        } catch (err) {
            setToast({ type: "error", message: err.message || "Failed to delete" });
        }
    };

    const handleCopy = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(text);
            setToast({ type: "success", message: "Copied to clipboard" });
            setTimeout(() => setCopied(null), 1200);
        } catch {
            setToast({ type: "error", message: "Copy failed" });
        }
    };

    return (
        <section className="relative min-h-screen bg-gradient-to-b from-white via-indigo-50/60 to-blue-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
            {/* background glow */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />
            </div>

            <Toast toast={toast} onClose={() => setToast(null)} />

            <div className="max-w-3xl mx-auto text-center">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient">Shorten</span>{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-600 animate-gradient">
                            Your Links
                        </span>
                    </h1>
                    <p className="mt-3 text-lg sm:text-xl text-gray-600">
                        Create beautiful, fast & shareable short links in seconds.
                    </p>
                </motion.div>

                {/* Form Card */}
                <motion.form
                    onSubmit={onSubmit}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45 }}
                    className="relative bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_10px_40px_rgba(2,6,23,0.08)] rounded-2xl p-6 sm:p-8 space-y-5 overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(79,70,229,0.45)] hover:border-indigo-300">

                    {/* Animated glowing rim light */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-70">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500 via-yellow-500 via-orange-500 via-pink-500 to-purple-500 blur-2xl animate-pulse" />
                    </div>

                    {/* On hover, extra glow layer */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/25 via-indigo-400/25 to-cyan-400/25 blur-3xl animate-[spin_6s_linear_infinite]" />
                    </div>

                    {/* Destination URL */}
                    <div className="text-left">
                        <label htmlFor="url" className="block text-sm font-semibold text-gray-950">
                            Destination URL
                        </label>
                        <input
                            id="url"
                            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/90 outline-none  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:bg-white/70 backdrop-blur-md"
                            type="url"
                            placeholder="https://example.com/my/very/long/link"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required />
                        {!isValidUrl(url) && url.length > 0 && (
                            <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                                <AlertCircle className="w-4 h-4" />
                                <span>Enter a valid URL starting with http:// or https://</span>
                            </div>
                        )}
                    </div>

                    {/* Custom Alias */}
                    <div className="text-left">
                        <label htmlFor="alias" className="block text-sm font-semibold text-gray-950">
                            Custom Alias (optional)
                        </label>
                        <input
                            id="alias"
                            className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 bg-white/90 outline-none  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:bg-white/70 backdrop-blur-md"
                            type="text"
                            placeholder="My-Custom_Alias;123"
                            value={alias}
                            onChange={handleAliasChange} />
                        {aliasError ? (
                            <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
                                <AlertCircle className="w-4 h-4" />
                                <span>{aliasError}</span>
                            </div>
                        ) : alias.length > 0 ? (
                            <div className="mt-2 text-sm text-green-600">
                                ✅ Alias is allowed
                            </div>
                        ) : (
                            <div className="mt-1 text-xs text-gray-800">
                                You can use letters, numbers, dash (-), underscore (_), and at (@).
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={!canSubmit}
                        className={`relative w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition-transform duration-200 ${canSubmit ? `bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700  hover:scale-105 hover:shadow-[0_0_25px_rgba(79,70,229,0.7)] cursor-pointer  ${loading ? "animate-pulse" : ""}` : "bg-gray-300 cursor-not-allowed"}`}>
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Generating…
                            </>
                        ) : (
                            <>
                                <LinkIcon className="w-5 h-5" />
                                Generate Short Link
                            </>
                        )}
                    </button>
                </motion.form>

                {/* Results */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="mt-10 bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_10px_40px_rgba(2,6,23,0.06)] rounded-2xl p-6 sm:p-8 text-left">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-500 to-blue-400 animate-gradient">Your</span>{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 animate-gradient">
                            Short Links
                        </span>
                    </h2>

                    {results.length === 0 ? (
                        <p className="text-gray-500">No links generated yet.</p>
                    ) : (
                        <div className="divide-y">
                            {results.map((item, index) => (
                                <motion.div
                                    key={`${item.shortUrl}-${index}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.04 }}
                                    className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div className="min-w-0">
                                        <Link
                                            className="inline-flex items-center gap-2 underline underline-offset-4 decoration-2 text-indigo-600 hover:text-indigo-800 hover:decoration-indigo-400 transition break-all"
                                            href={item.shortUrl}
                                            target="_blank"
                                            rel="noreferrer">
                                            <LinkIcon className="w-4 h-4 shrink-0" />
                                            <span className="truncate">{item.shortUrl}</span>
                                        </Link>
                                        <p className="mt-1 text-xs text-gray-500 break-all">
                                            {item.originalUrl}
                                        </p>
                                        {item.alias && (
                                            <p className="mt-1 text-[11px] text-gray-500">
                                                alias: <code className="px-1 py-0.5 rounded bg-gray-100">{item.alias}</code>
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex gap-3">
                                        {/* Copy Button */}
                                        <button
                                            className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ease-out border cursor-pointer shadow-md ${copied === item.shortUrl
                                                ? "bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600 hover:shadow-[0_0_20px_rgba(16,185,129,0.6)] hover:scale-[1.07] active:scale-[0.95]"
                                                : "bg-emerald-200 text-emerald-600 border-emerald-400 hover:bg-emerald-300 hover:text-emerald-800 hover:border-emerald-500 hover:shadow-[0_0_18px_rgba(16,185,129,0.4)] hover:scale-[1.07] active:scale-[0.95]"
                                                }`}
                                            onClick={() => handleCopy(item.shortUrl)}>
                                            {copied === item.shortUrl ? (
                                                <>
                                                    <Check className="w-4 h-4" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4" />
                                                    Copy
                                                </>
                                            )}
                                            {/* Glowing Pulse on Copied */}
                                            {copied === item.shortUrl && (
                                                <span className="absolute inset-0 rounded-xl bg-emerald-400/40 blur-xl animate-pulse pointer-events-none"></span>
                                            )}
                                        </button>

                                        {/* Delete Button */}
                                        <button
                                            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ease-out border cursor-pointer bg-red-200 text-red-600 border-red-400 hover:bg-red-300 hover:text-red-800 hover:border-red-500 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:scale-[1.07] active:scale-[0.95]"
                                            onClick={() => deleteLink(item.shortUrl)}>
                                            <Trash2 className="w-4 h-4" />
                                            Delete
                                            {/* Subtle Glow Effect */}
                                            <span className="absolute inset-0 rounded-xl bg-red-400/30 blur-lg opacity-0 hover:opacity-70 transition-opacity duration-500 pointer-events-none"></span>
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}
