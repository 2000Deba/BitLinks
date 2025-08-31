const gradients = [
    "from-blue-400 via-cyan-500 to-sky-600",      // Gradient 1
    "from-orange-400 via-rose-500 to-pink-600",   // Gradient 2
    "from-green-400 via-emerald-500 to-teal-500", // Gradient 3
];

export default function FeatureCard({ title, desc, icon, index }) {
    return (
        <div
            className="group relative bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center">
            {/* Icon Box */}
            <div
                className={`h-16 w-16 rounded-2xl bg-gradient-to-r ${gradients[index % gradients.length]} flex items-center justify-center text-white text-3xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>

            {/* Title */}
            <h3 className="mt-6 text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                {title}
            </h3>

            {/* Description */}
            <p className="mt-3 text-gray-600 leading-relaxed max-w-xs">
                {desc}
            </p>

            {/* Gradient underline hover effect */}
            <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-2xl transition-all duration-300"></span>
        </div>
    );
}
