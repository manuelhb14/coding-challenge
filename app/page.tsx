'use client'

import React, { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Card from "./components/card";
import Skeleton from "./components/skeleton";
import useOnScreen from "./hooks/useOnScreen";
import fetchCatFacts from "./actions";
import { CatFact, User } from "./types";


export default function Home() {

    const ref = useRef<HTMLButtonElement>(null)
    const isVisible = useOnScreen(ref)      

    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        // status,
    } = useInfiniteQuery({
        queryKey: ['projects'],
        queryFn: fetchCatFacts,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    })

    useEffect(() => {
        if (isVisible) {
            fetchNextPage()
        }
    }
    , [isVisible, fetchNextPage])

    return (
        <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)] bg-[repeating-linear-gradient(135deg,transparent,transparent_8px,#f5f5f5_8px,#f5f5f5_9px)]">
            <div className="flex flex-col items-center justify-center gap-5 p-8 pb-10 sm:p-12 bg-zinc-100">
                {data && data.pages.map((page, index) => {
                    return (
                        <div key={index} className="flex flex-col gap-5">
                            {page.usersAndCats.map(({ user, catFact }: {user: User, catFact: CatFact}) => {
                                return <Card key={user.login.uuid} user={user} catFact={catFact} />
                            })}
                        </div>
                    )
                }
                )}
                {(isFetching || isFetchingNextPage) && (
                    <Skeleton />
                )}
                {error && (
                    <div className="flex items-center justify-center w-full p-4 text-red-500 bg-red-100 rounded-lg">
                        <p className="text-sm font-semibold">Error: {error.message}</p>
                    </div>
                )}
                <button className="text-sm px-3 py-2 text-white bg-zinc-700 rounded-md shadow-lg hover:bg-zinc-900 disabled:bg-zinc-300" onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage} ref={ref}>
                    {isFetchingNextPage ? 'Loading...' : hasNextPage ? 'Load More' : 'Nothing more to load'}
                </button>
            </div>
        </div>
    )
}