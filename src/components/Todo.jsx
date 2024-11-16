import React from "react";

const Todo = ({ title, desc, color, onDelete }) => {
    // Map color names to gradients for a vibrant look
    const colorMapping = {
        blue: "bg-gradient-to-r from-blue-400 to-blue-600",
        green: "bg-gradient-to-r from-green-400 to-green-600",
        yellow: "bg-gradient-to-r from-yellow-400 to-yellow-600",
        gray: "bg-gradient-to-r from-gray-400 to-gray-600",
        purple: "bg-gradient-to-r from-purple-400 to-purple-600",
    };

    // Apply default background if color is not provided
    const appliedColor = colorMapping[color] || "bg-gradient-to-r from-zinc-800 to-zinc-900";

    return (
        <div
            className={`${appliedColor} rounded-xl w-60 h-72 flex flex-col p-6 shadow-lg transform hover:scale-105 transition-transform border border-gray-700`}
        >
            <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                {title}
            </h1>
            <p className="mt-4 text-gray-200 text-sm overflow-hidden max-h-16 break-words">
                {desc}
            </p>
            <button
                onClick={onDelete}
                className="bg-black/60 hover:bg-black/80 text-white font-medium text-sm px-4 py-2 rounded-full mt-auto ml-auto shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
                Done
            </button>
        </div>
    );
};

export default Todo;
