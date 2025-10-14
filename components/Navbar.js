"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Home, Info, Link2, Phone, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Reusable NavLink
function NavLink({ href, label, icon, currentPath, onClick }) {
    const active = currentPath === href;
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`relative group flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400/50 ${active
                ? "text-indigo-600 dark:text-indigo-400"
                : "text-gray-700 dark:text-gray-300 hover:text-indigo-500"
                }`}
            aria-current={active ? "page" : undefined}>
            {icon}
            {label}
            {/* Active / Hover underline */}
            <span
                className={`pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
        </Link>
    );
}

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const links = [
        { href: "/", label: "Home", icon: <Home size={18} /> },
        { href: "/about", label: "About", icon: <Info size={18} /> },
        { href: "/shorten", label: "Shorten", icon: <Link2 size={18} /> },
        { href: "/contact", label: "Contact", icon: <Phone size={18} /> },
    ];

    const toggle = () => setOpen((v) => !v);
    const close = () => setOpen(false);
    useEffect(() => {
        close()
    }, [pathname])

    return (
        <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-neutral-900/70 shadow-md supports-[backdrop-filter]:bg-white/50">
            <div className="container mx-auto flex h-16 items-center justify-between px-6">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold flex items-center tracking-tight select-none">
                    <img className="w-8 h-8" src="/bitlinks.png" alt="" />
                    <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent ml-2">BitLinks</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {links.map((l) => (
                        <NavLink
                            key={l.href}
                            href={l.href}
                            label={l.label}
                            icon={l.icon}
                            currentPath={pathname} />
                    ))}
                </nav>

                {/* CTA (Desktop) */}
                <div className="hidden md:block">
                    <Link
                        href="/shorten"
                        className="relative inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-white font-medium shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out hover:scale-105 hover:shadow-[0_0_18px_rgba(168,85,247,0.7)] focus:outline-none focus:ring-2 focus:ring-purple-400/50 after:content-[''] after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-r after:from-indigo-500 after:via-purple-500 after:to-pink-500 after:opacity-0 hover:after:opacity-40 after:blur-xl after:transition-opacity after:duration-500">
                        <LogIn size={16} />
                        Try Now
                    </Link>
                </div>


                {/* Mobile Hamburger */}
                <button
                    onClick={toggle}
                    className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/50"
                    aria-label="Toggle menu"
                    aria-controls="mobile-menu"
                    aria-expanded={open}>
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu with Animation */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden border-t border-gray-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/40 shadow-lg">
                        <nav className="flex flex-col gap-2 p-4">
                            {links.map((l) => (
                                <NavLink
                                    key={l.href}
                                    href={l.href}
                                    label={l.label}
                                    icon={l.icon}
                                    currentPath={pathname}
                                    onClick={close} />
                            ))}
                            <Link
                                href="/shorten"
                                onClick={close}
                                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-white shadow-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-indigo-400/50">
                                <LogIn size={16} />
                                Try Now
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
