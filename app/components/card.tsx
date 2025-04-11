import React from "react";
import { CatFact, User } from "../types";

export default function Card({ user, catFact }: {user: User, catFact: CatFact}) {
    return (
        <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md w-sm md:w-md lg:w-lg max-w-lg">
            <div className="flex items-center gap-4">
            {/* eslint-disable @next/next/no-img-element */ }
                <img
                    src={user.picture.thumbnail}
                    alt="User"
                    className="w-12 h-12 rounded-full"
                />
                <h2 className="text-base font-semibold">{user.name.first}{" "}{user.name.last}</h2>
            </div>
            <p className="text-gray-700">{catFact.fact}</p>
        </div>
    );
}