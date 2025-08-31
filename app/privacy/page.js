import Link from "next/link";

export const metadata = {
    title: "Privacy Policy - BitLinks",
    description: "Read the BitLinks Privacy Policy to understand how we collect, use, and protect your data.",
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-800">
            <div className="container max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <h1 className="text-4xl sm:text-5xl font-bold text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Privacy Policy
                </h1>
                <p className="text-center text-gray-600 mt-3">
                    Last updated: <span className="font-semibold">August 27, 2025</span>
                </p>

                {/* Intro */}
                <p className="mt-6 text-lg text-gray-700 leading-relaxed text-center">
                    At <span className="font-semibold">BitLinks</span>, your privacy is our top priority.
                    This Privacy Policy explains what information we collect, how we use it,
                    and how we keep it safe. By using our services, you agree to this policy.
                </p>

                {/* Main Content */}
                <div className="prose max-w-none mt-10">
                    <h2>1. Information We Collect</h2>
                    <p>
                        We collect basic information when you use our services, such as:
                    </p>
                    <ul>
                        <li>Email address (if you mail us)</li>
                        <li>Analytics data (e.g. device, browser, IP)</li>
                        <li>Links you shorten and share</li>
                    </ul>

                    <h2>2. How We Use Your Information</h2>
                    <p>We use your data to:</p>
                    <ul>
                        <li>Provide and improve our services</li>
                        <li>Monitor website performance</li>
                        <li>Communicate important updates</li>
                    </ul>

                    <h2>3. Cookies</h2>
                    <p>
                        We use cookies to enhance your browsing experience and track website usage.
                        You can disable cookies in your browser settings, but some features may not work properly.
                    </p>

                    <h2>4. Data Security</h2>
                    <p>
                        We take security seriously. All sensitive data is encrypted and stored securely.
                        However, no system is 100% secure, and we cannot guarantee absolute security.
                    </p>

                    <h2>5. Third-Party Services</h2>
                    <p>
                        We may use third-party services (like analytics or payment providers) that
                        collect information in accordance with their own privacy policies.
                    </p>

                    <h2>6. Your Rights</h2>
                    <p>
                        You have the right to access, update, or delete your personal information.
                        If you wish to exercise these rights, please contact us.
                    </p>

                    <h2>7. Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, you can reach us at:{" "}
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
