import Link from "next/link";

export const metadata = {
    title: "Terms of Service - BitLinks",
    description: "Read the BitLinks Terms of Service to understand the rules and policies of using our platform.",
};

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800">
            <div className="container max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <h1 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Terms of Service
                </h1>
                <p className="text-center text-gray-600 mt-3">
                    Last updated: <span className="font-semibold">August 27, 2025</span>
                </p>

                {/* Intro */}
                <p className="mt-6 text-lg text-gray-700 leading-relaxed text-center">
                    Welcome to <span className="font-semibold">BitLinks</span>.
                    By using our website, you agree to comply with and be bound by the following terms and conditions.
                    Please read them carefully.
                </p>

                {/* Main Content */}
                <div className="prose max-w-none mt-10">
                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing or using BitLinks, you agree to these Terms of Service and
                        all applicable laws and regulations. If you do not agree, please discontinue
                        using our services immediately.
                    </p>

                    <h2>2. Use of Our Services</h2>
                    <p>
                        You agree to use BitLinks only for lawful purposes and in a way that does not infringe
                        the rights of, restrict, or inhibit anyone else&apos;s use and enjoyment of the platform.
                    </p>

                    <h2>3. Account Responsibilities</h2>
                    <p>
                        If you create an account with us, you are responsible for maintaining the security
                        of your account and for all activities that occur under it. BitLinks will not be
                        liable for any loss or damage arising from your failure to safeguard your credentials.
                    </p>

                    <h2>4. Prohibited Activities</h2>
                    <ul>
                        <li>Using BitLinks for illegal or fraudulent purposes</li>
                        <li>Uploading harmful code or viruses</li>
                        <li>Spamming, phishing, or spreading malware</li>
                        <li>Violating intellectual property rights</li>
                    </ul>

                    <h2>5. Intellectual Property</h2>
                    <p>
                        All content, design, and code on BitLinks are protected by copyright and trademark laws.
                        You may not copy, modify, distribute, or reuse any part of BitLinks without prior
                        written permission.
                    </p>

                    <h2>6. Limitation of Liability</h2>
                    <p>
                        BitLinks is not responsible for any damages arising from the use or inability
                        to use our services, including data loss or unauthorized access.
                    </p>

                    <h2>7. Termination</h2>
                    <p>
                        We reserve the right to suspend or terminate your account if you violate these
                        terms or engage in harmful activities.
                    </p>

                    <h2>8. Changes to Terms</h2>
                    <p>
                        We may update these Terms of Service from time to time. Any changes will be
                        reflected on this page with a new “Last updated” date.
                    </p>

                    <h2>9. Contact Us</h2>
                    <p>
                        For any questions regarding these Terms, please contact us at:{" "}
                        <Link
                            href="mailto:support@bitlinks.com"
                            className="text-blue-600 hover:underline">
                            support@bitlinks.com
                        </Link>
                    </p>
                </div>

                {/* Back to Home */}
                <div className="mt-10 text-center">
                    <Link
                        href="/"
                        className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
