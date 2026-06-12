"use client"

import { useState, useEffect } from "react";
import { Movie } from "../../types/movie";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Series } from "@/app/types/tvshows";

export function TrendingPanelTV() {

    const [series, setSeries] = useState<Series[]>([]);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/series/trending');
            const data = await response.json();
            setSeries(data.results);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div className="m-3 py-6">
            <h1 className="text-foreground text-lg font-bold tracking-tight mb-4">
                Trending this week
            </h1>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
                {series.slice(0, 14).map((m, index) => (

                    <Link href={`/homepage/series/${m.id}/onboarding`} key={m.id}>

                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.4,
                                delay: index * 0.04,
                                ease: "easeOut"
                            }}
                            whileHover={{ y: -6 }}
                            className="group relative flex flex-col cursor-pointer"
                        >
                            {/* Poster */}
                            <div className="relative overflow-hidden rounded-xl">
                                <Image
                                    src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                                    alt={m.name}
                                    width={160}
                                    height={240}
                                    className="w-full object-cover transition duration-300 saturate-60 group-hover:saturate-160 group-hover:scale-105"
                                />

                                {/* Vote average badge */}
                                {/*           <div className="absolute top-2 right-2 z-10 bg-background/60 backdrop-blur-sm text-amber-200 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                                ★ {m.vote_average.toFixed(1)}
                            </div> */}

                                {/* Popularity badge */}
                                <div className="absolute top-2 left-2 z-10 bg-background/60 backdrop-blur-sm text-foreground/60 text-xs px-2 py-0.5 rounded-full">
                                    {m.popularity.toFixed(0)}
                                </div>

                                {/* Bottom gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 z-10" />
                            </div>

                            {/* Info */}
                            <div className="pt-2 px-1">
                                <h3 className="text-foreground text-sm font-semibold line-clamp-1">
                                    {m.name}
                                </h3>
                                <span className="text-foreground/50 text-xs">
                                    {/*                                  {m.first_air_date.slice(0, 4)}
 */}                          </span>
                            </div>
                        </motion.div>

                    </Link>

                ))}
            </div>
        </div>
    );
}  