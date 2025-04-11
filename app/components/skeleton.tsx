import React from "react";

export default function Skeleton() {
    return (
        <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md w-sm md:w-md lg:w-lg max-w-lg">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                <div className="w-40 h-4 bg-gray-200 rounded-full animate-pulse" />
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full animate-pulse" />
            <div className="w-full h-3 bg-gray-200 rounded-full animate-pulse" />
        </div>
    );
}