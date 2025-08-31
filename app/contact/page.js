"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";


export default function ContactPage() {
    return (
        <>
            <section className="relative flex flex-col items-center justify-center py-12 px-5 sm:px-8 md:px-12 lg:px-20">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-100 via-white to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10" />

                {/* Heading Section */}
                <motion.div
                    className="text-center max-w-2xl"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent">
                        Contact Us
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mt-3">
                        We&apos;re here to help! Whether you have questions, feedback, or partnership ideas, feel free to reach out.
                    </p>
                </motion.div>

                {/* Contact Card */}
                <motion.div
                    className="mt-10 w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700 backdrop-blur-lg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-5 sm:p-6 rounded-xl shadow-sm border border-blue-100/50 dark:border-blue-700/40 transition duration-300">
                        <h3 className="text-xl sm:text-2xl font-bold text-blue-700 dark:text-blue-300 mb-3">
                            Email Us
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-5">
                            Got questions or need support? Drop us an email and we&apos;ll get back to you ASAP.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 mt-1 flex flex-wrap items-center gap-2 sm:gap-3">
                            Reach us at:{" "}
                            <Link
                                href="mailto:support@bitlinks.example"
                                className="inline-block bg-blue-600 text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300">
                                support@bitlinks.example
                            </Link>
                        </p>
                    </div>
                </motion.div>

                {/* Social Media Section */}
                <motion.div
                    className="mt-12 text-center w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 dark:border-gray-700 backdrop-blur-lg"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}>
                    <div className="bg-green-50 dark:bg-green-900/20 p-5 sm:p-6 rounded-xl shadow-sm border border-green-100/50 dark:border-green-700/40 transition duration-300">
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700 dark:text-green-300 mb-3">
                            Follow Us
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-6">
                            Stay updated with our latest news, updates, new features, changes, and tips.{" "}
                            <span className="italic">(Social links coming soon!)</span>
                        </p>

                        <div className="flex justify-center gap-5 sm:gap-6">
                            {/* Twitter */}
                            <Link
                                href="#"
                                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: "#1DA1F2" }} // Twitter Blue
                                aria-label="Twitter">
                                <FaTwitter className="text-lg sm:text-xl" />
                            </Link>

                            {/* Facebook */}
                            <Link
                                href="#"
                                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-300"
                                style={{ backgroundColor: "#1877F2" }} // Facebook Blue
                                aria-label="Facebook">
                                <FaFacebookF className="text-lg sm:text-xl" />
                            </Link>

                            {/* Instagram */}
                            <Link
                                href="#"
                                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform duration-300"
                                style={{
                                    background:
                                        "radial-gradient(circle at 30% 30%, #f58529 10%, #dd2a7b 40%, #8134af 70%, #515bd4 100%)"
                                }}
                                aria-label="Instagram">
                                <FaInstagram className="text-lg sm:text-xl" />
                            </Link>
                        </div>

                        {/* Footer Note */}
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center mt-10">
                            We usually reply within 24 hours 😊
                        </p>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
