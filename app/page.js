import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import FeatureCard from "@/components/FeatureCard";
import Testimonial from "@/components/Testimonial";
import TypedText from "@/components/TypedText";

export default function HomePage() {
    return (
        <div className="space-y-32">
            {/* Hero Section */}
            <section className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-blue-500/10 blur-3xl -z-10"></div>

                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">The</span>{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-600 animate-gradient">
                        simplest
                    </span>{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-600 animate-gradient">way to</span>{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-indigo-500 to-purple-500 animate-gradient">
                        shorten
                    </span>{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 animate-gradient">your links</span>
                </h1>

                <p className="text-3xl font-bold m-6"><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-sky-700">The Best URL Shortener in the Market</span></p>

                <p className="mt-6 text-gray-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                    We're the most straightforward URL shortener on the web. Lightweight, privacy-friendly, and no login required as we prioritize your privacy by not tracking your activities or requiring login details. Create clean, memorable links in just seconds.
                </p>

                <TypedText />

                <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
                    {/* Try Now Button */}
                    <Link
                        href="/shorten"
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600
                        hover:from-indigo-700 hover:to-blue-700
                        text-white text-lg font-semibold rounded-xl
                        shadow-lg shadow-indigo-500/30
                        transition-all duration-300 transform
                        hover:scale-110 hover:rotate-[2deg]
                        hover:shadow-[8px_8px_25px_rgba(99,102,241,0.5)]">
                        Try Now
                        <FiArrowUpRight className="text-2xl" /> {/* সুন্দর Arrow Icon */}
                    </Link>

                    {/* GitHub Button */}
                    <Link
                        href="https://github.com/2000Deba"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-gray-700 via-gray-900 to-black
                        hover:from-gray-800 hover:via-black hover:to-gray-900
                        text-white text-lg font-semibold rounded-xl
                        shadow-md shadow-gray-900/40
                        transition-all duration-300 transform
                        hover:scale-110 hover:-rotate-[2deg]
                        hover:shadow-[-8px_8px_25px_rgba(99,102,241,0.5)]">
                        <FaGithub className="text-2xl" />
                        GitHub
                    </Link>

                </div>
            </section>

            {/* Features Section */}
            <section className="px-6 sm:px-8 lg:px-10">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-600">
                        Features
                    </span>{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500">and Why Choose</span>{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Us?</span>
                </h2>

                <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto">
                    <FeatureCard
                        title="Simple & Easy"
                        desc="Shorten URLs instantly with just a couple of clicks. No sign-up, no hassle."
                        icon={<span className="text-4xl">🔗</span>}
                        index={0} />
                    <FeatureCard
                        title="Privacy First"
                        desc="We don&apos;t track you. No analytics, no ads — just pure, clean links."
                        icon={<span className="text-4xl">🛡️</span>}
                        index={1} />
                    <FeatureCard
                        title="Custom Aliases"
                        desc="Create personalized short links with your own memorable codes."
                        icon={<span className="text-4xl">✏️</span>}
                        index={2} />
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="px-6 sm:px-8 lg:px-10 relative">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-b from-indigo-50 to-transparent blur-2xl -z-10"></div>

                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-600">What Our</span>{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-emerald-500 to-teal-600">
                        Users
                    </span>{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-500 to-indigo-500">Say</span>
                </h2>

                <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
                    <Testimonial
                        quote="The best URL shortener I&apos;ve ever used — it&apos;s blazing fast and has a super clean UI!"
                        author="Alex Ledesma"
                        role="Startup Owner"
                        avatar="https://randomuser.me/api/portraits/men/75.jpg" />
                    <Testimonial
                        quote="Love the customization options and their strong privacy stance. Highly recommended!"
                        author="Vijay Kumar"
                        role="Freelancer" />
                </div>
            </section>
        </div>
    );
}
