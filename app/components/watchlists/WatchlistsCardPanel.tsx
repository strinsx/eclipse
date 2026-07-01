"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { getWatchlist } from "@/app/lib/services/watchlist.services";
import { WatchLaterItem } from "@/app/types/movie";

export function WatchlistsCardPanel() {
    const [items, setItems] = useState<(WatchLaterItem & { media_type: string })[]>([]);

    useEffect(() => {
        getWatchlist().then(setItems);
    }, []);

    if (items.length === 0) {
        return (
            <div className="m-3 py-6">
                <h1 className="text-white text-lg font-bold tracking-tight mb-4">
                    My Watchlist
                </h1>
                <p className="text-foreground/50 text-sm">Your watchlist is empty.</p>
            </div>
        );
    }

    return (
        <div className="m-3 py-6">
            <h1 className="text-white text-lg font-bold tracking-tight mb-4">
                My Watchlist
            </h1>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
                {items.map((m, index) => (
                    <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -6 }}
                        transition={{
                            duration: 0.4,
                            delay: index * 0.04,
                            ease: "easeOut"
                        }}
                    >
                        <Link href={`/homepage/${m.media_type === "tv" ? "series" : "movies"}/${m.id}/onboarding`}>
                            <div className="group relative flex flex-col cursor-pointer">
                                {/* Poster */}
                                <div className="relative overflow-hidden rounded-xl h-[160px] sm:h-[200px] md:h-[240px]">
                                    <Image
                                        src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                                        alt={m.title}
                                        width={160}
                                        height={240}
                                        className="w-full object-cover transition duration-300 saturate-60 group-hover:saturate-160 group-hover:scale-105"
                                    />

                                    {/* Bottom gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 z-10" />
                                </div>

                                {/* Info */}
                                <div className="pt-2 px-1">
                                    <h3 className="text-foreground text-sm font-semibold line-clamp-1">
                                        {m.title}
                                    </h3>
                                    <span className="text-foreground/50 text-xs">
                                        {m.release_date?.slice(0, 4)}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
