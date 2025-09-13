import Link from "next/link";
import {
    FaFacebook,
    FaTwitter,
    FaGithub,
    FaLinkedin,
    FaInstagram,
} from "react-icons/fa";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Left Side - Branding */}
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold tracking-wide">BitLinks</h2>
                    <p className="text-sm opacity-90">
                        Shorten. Share. Simplify your links.
                    </p>
                </div>

                {/* Middle - Privacy & Terms */}
                <div className="flex flex-col sm:flex-row items-center gap-3 text-center md:text-right">
                    <Link
                        href="/privacy"
                        className="hover:text-yellow-300 hover:underline transition-colors duration-200 font-medium">
                        Privacy Policy
                    </Link>
                    <span className="hidden sm:inline text-gray-300">|</span>
                    <Link
                        href="/terms"
                        className="hover:text-yellow-300 hover:underline transition-colors duration-200 font-medium">
                        Terms of Service
                    </Link>
                </div>

                {/* Right Side - Social Icons */}
                <div className="flex items-center gap-5">
                    <Link
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-125 transition-transform duration-300">
                        <FaFacebook size={26} className="hover:text-blue-300" />
                    </Link>
                    <Link
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-125 transition-transform duration-300">
                        <FaTwitter size={26} className="hover:text-sky-300" />
                    </Link>
                    <Link
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-125 transition-transform duration-300">
                        <FaInstagram size={26} className="hover:text-pink-300" />
                    </Link>
                    <Link
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-125 transition-transform duration-300">
                        <FaLinkedin size={26} className="hover:text-blue-200" />
                    </Link>
                    <Link
                        href="https://github.com/2000Deba"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:scale-125 transition-transform duration-300">
                        <FaGithub size={26} className="hover:text-gray-300" />
                    </Link>
                </div>
            </div>

            {/* Bottom - Copyright */}
            <div className="bg-black/20 backdrop-blur-sm mt-4">
                <p className="text-sm sm:text-lg text-gray-100 text-center pt-3 tracking-wide">
                    Copyright &copy; {year} <span className="font-semibold">BitLinks</span>. All rights reserved.
                </p>
                <p className="text-sm sm:text-lg text-gray-100 text-center pb-3 tracking-wide">Created with ❤️ by Deba</p>
            </div>
        </footer>
    );
}
