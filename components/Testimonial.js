import { User } from "lucide-react"; // Placeholder icon (optional)

export default function Testimonial({ quote, author, role, avatar }) {
    return (
        <figure className="group relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 max-w-md mx-auto text-center">
            {/* Quote */}
            <blockquote className="text-gray-700 italic leading-relaxed">
                “{quote}”
            </blockquote>

            {/* Author Info */}
            <figcaption className="mt-6 flex items-center justify-center gap-3">
                {/* Avatar */}
                {avatar ? (
                    <img
                        src={avatar}
                        alt={author}
                        className="w-12 h-12 rounded-full object-cover shadow-md group-hover:scale-105 transition-transform duration-300" />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
                        <User size={24} />
                    </div>
                )}

                {/* Author Name & Role */}
                <div className="text-left">
                    <p className="text-base font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                        {author}
                    </p>
                    <p className="text-sm text-gray-500">{role}</p>
                </div>
            </figcaption>

            {/* Gradient underline hover effect */}
            <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-b-2xl transition-all duration-300"></span>
        </figure>
    );
}
