"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Link2, MousePointerClick, Activity, Lock, Zap, Sparkles, Share2, Shield, ArrowUpRight } from "lucide-react";

// Animated Counter with Auto-Format (K / M)
function AnimatedCounter({ value, suffix = "", isPercent = false, duration = 5000 }) {
    const [displayValue, setDisplayValue] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        let start = 0;
        const end = Number(value);
        if (isNaN(end)) return;

        const incrementTime = 20;
        const totalSteps = Math.ceil(duration / incrementTime);
        const increment = end / totalSteps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setDisplayValue(end);
                setIsFinished(true);
                clearInterval(timer);
            } else {
                setDisplayValue(start);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value, duration]);

    const formatValue = (num) => {
        if (isPercent) return num.toFixed(2) + "%";

        if (isFinished) {
            if (num >= 1_000_000) {
                return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M+";
            }
            if (num >= 1_000) {
                return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K+";
            }
        }

        return Math.floor(num).toLocaleString() + suffix;
    };

    return <motion.span>{formatValue(displayValue)}</motion.span>;
}

export default function AboutPage() {
    const features = [
        {
            title: "Privacy-focused",
            desc: "We never track you — your data stays yours.",
            icon: <Lock className="w-6 h-6 text-indigo-600" />,
        },
        {
            title: "Blazing Fast",
            desc: "Shorten URLs in milliseconds — no signup needed.",
            icon: <Zap className="w-6 h-6 text-blue-600" />,
        },
        {
            title: "Custom Aliases",
            desc: "Create unique, memorable slugs for your links.",
            icon: <Sparkles className="w-6 h-6 text-purple-600" />,
        },
        {
            title: "Easy Sharing",
            desc: "Share seamlessly across devices and platforms.",
            icon: <Share2 className="w-6 h-6 text-green-600" />,
        },
    ];

    return (
        <section className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-blue-50 py-16 px-4 sm:px-6 lg:px-8 relative">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/30 via-purple-200/30 to-blue-200/30 blur-3xl -z-10"></div>

            <div className="max-w-5xl mx-auto text-center">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-14">
                    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight text-gray-900">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-cyan-500 to-blue-400 animate-gradient">About</span>{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 animate-gradient">
                            BitLinks
                        </span>
                    </h1>
                    <p className="mt-5 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Fast, simple, and privacy-first URL shortening — built for
                        everyone who loves clean and powerful sharing.
                    </p>
                </motion.div>

                {/* Floating SVG */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="flex justify-center mb-12">
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="240"
                            height="240"
                            viewBox="0 0 512 512"
                            className="drop-shadow-2xl">
                            <defs>
                                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#6366f1" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                                <linearGradient id="blue" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#60a5fa" />
                                    <stop offset="100%" stopColor="#2563eb" />
                                </linearGradient>
                                <linearGradient id="green" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0%" stopColor="#34d399" />
                                    <stop offset="100%" stopColor="#16a34a" />
                                </linearGradient>
                            </defs>

                            <circle cx="256" cy="256" r="220" fill="url(#g1)" opacity="0.12" />
                            <path
                                d="M342 212l40-40c22-22 22-57 0-79s-57-22-79 0l-40 40"
                                fill="none"
                                stroke="url(#green)"
                                strokeWidth="24"
                                strokeLinecap="round"
                                strokeLinejoin="round" />
                            <path
                                d="M170 300l-40 40c-22 22-22 57 0 79s57 22 79 0l40-40"
                                fill="none"
                                stroke="url(#blue)"
                                strokeWidth="24"
                                strokeLinecap="round"
                                strokeLinejoin="round" />
                            <path
                                d="M192 320l128-128"
                                fill="none"
                                stroke="url(#blue)"
                                strokeWidth="26"
                                strokeLinecap="round"
                                strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </motion.div>

                {/* Mission + Features */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="bg-white shadow-xl rounded-2xl p-8 sm:p-12 border border-indigo-100">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-600 animate-gradient">Our</span>{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-600 animate-gradient">
                            Mission
                        </span>
                    </h2>
                    <p className="text-gray-600 mb-8 text-base sm:text-lg leading-relaxed">
                        BitLinks is built to make sharing effortless. We value privacy,
                        simplicity, and speed — giving you total control of your links.
                    </p>

                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient">Features</span>{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-600 animate-gradient">
                            You&apos;ll Love
                        </span>
                    </h2>

                    {/* Updated Feature Icons */}
                    <motion.ul
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.2 },
                            },
                        }}
                        className="grid gap-5 sm:grid-cols-2 text-left mb-10">
                        {features.map((feature, idx) => (
                            <motion.li
                                key={idx}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                className="flex items-start gap-4 bg-white border border-indigo-100 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-300/30 transition rounded-xl p-5 group relative overflow-hidden">
                                {/* Icon Box with Continuous Glow */}
                                <div className="p-3 rounded-lg  group-hover:shadow-md transition bg-indigo-50 text-indigo-600 shadow-[0_0_15px_rgba(99,102,241,0.6)] animate-pulseGlow">
                                    {feature.icon}
                                </div>
                                <div>
                                    <span className="text-indigo-600 font-semibold text-lg">
                                        {feature.title}
                                    </span>
                                    <p className="text-gray-600 text-sm mt-1">{feature.desc}</p>
                                </div>
                            </motion.li>
                        ))}
                    </motion.ul>

                    {/* Stats Section with Animated Counter & Glowing Effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                        {[
                            {
                                value: 100000,
                                suffix: "+",
                                label: "Links Shortened",
                                icon: <Link2 className="w-7 h-7 text-indigo-600" />,
                            },
                            {
                                value: 1000000,
                                suffix: "+",
                                label: "Total Clicks",
                                icon: <MousePointerClick className="w-7 h-7 text-blue-600" />,
                            },
                            {
                                value: 99.99,
                                suffix: "%",
                                label: "Uptime",
                                icon: <Activity className="w-7 h-7 text-green-600" />,
                            },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.2 }}
                                viewport={{ once: true }}
                                className="relative bg-gradient-to-r from-indigo-50 to-blue-50 shadow-lg rounded-xl p-6 border border-indigo-100 hover:border-indigo-300 hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] transition-all duration-500 group">
                                {/* Inner glowing ring effect */}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-400 to-blue-400 opacity-0 group-hover:opacity-20 blur-2xl transition duration-500"></div>

                                <div className="flex justify-center mb-3 relative z-10">
                                    {item.icon}
                                </div>
                                <h3 className="text-3xl sm:text-4xl font-extrabold text-indigo-600 relative z-10">
                                    <AnimatedCounter value={item.value} suffix={item.suffix} />
                                </h3>
                                <p className="text-gray-600 mt-2 font-medium relative z-10">
                                    {item.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 1 }}>
                        <Link
                            href="/shorten"
                            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 text-white font-semibold shadow-lg hover:scale-110 hover:shadow-indigo-400/40">
                            Get Started
                            <ArrowUpRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
