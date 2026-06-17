"use client"

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface SearchResult {
    id: number;
    title: string;
    poster_path: string | null;
    media_type: "movie" | "tv";
    release_date?: string;
    first_air_date?: string;
}

export function SearchResults() {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!query.trim()) return;

        const controller = new AbortController();
        const loadingTimer = setTimeout(() => setLoading(true), 0);

        fetch(`/api/search?query=${encodeURIComponent(query)}`, { signal: controller.signal })
            .then((res) => res.json())
            .then((data) => {
                setResults(data.results || []);
                setLoading(false);
            })
            .catch(() => {
                setResults([]);
                setLoading(false);
            });

        return () => {
            clearTimeout(loadingTimer);
            controller.abort();
        };
    }, [query]);

    if (!query) {
        return (
            <div className="flex-1 flex items-center justify-center m-3">
                <p className="text-foreground/50 text-lg">Enter a search term to find movies & series.</p>
            </div>
        );
    }

    return (
        <div className="flex-1 m-3 py-6">
            <h1 className="text-white text-2xl font-bold tracking-tight mb-2">
                Results for &quot;{query}&quot;
            </h1>
            <p className="text-foreground/50 text-sm mb-6">
                {loading ? "Searching..." : `${results.length} result${results.length !== 1 ? "s" : ""} found`}
            </p>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <p className="text-foreground/50">Loading...</p>
                </div>
            ) : results.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                    <p className="text-foreground/50">No results found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
                    {results.map((item, index) => (
                        <Link
                            key={`${item.media_type}-${item.id}`}
                            href={
                                item.media_type === "movie"
                                    ? `/homepage/movies/${item.id}/onboarding`
                                    : `/homepage/series/${item.id}/onboarding`
                            }
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: index * 0.02,
                                    ease: "easeOut",
                                }}
                                whileHover={{ y: -6 }}
                                className="group relative flex flex-col cursor-pointer"
                            >
                                <div className="relative overflow-hidden rounded-xl h-[160px] sm:h-[200px] md:h-[240px]">
                                    {item.poster_path ? (
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                            alt={item.title}
                                            fill
                                            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 14vw"
                                            className="object-cover transition duration-300 saturate-60 group-hover:saturate-160 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-foreground/10 flex items-center justify-center text-foreground/40 text-sm">
                                            No poster
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 z-10 bg-background/60 backdrop-blur-sm text-foreground/60 text-xs px-2 py-0.5 rounded-full capitalize">
                                        {item.media_type}
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 z-10" />
                                </div>
                                <div className="pt-2 px-1">
                                    <h3 className="text-foreground text-sm font-semibold line-clamp-1">
                                        {item.title}
                                    </h3>
                                    <span className="text-foreground/50 text-xs">
                                        {(item.release_date || item.first_air_date || "").slice(0, 4)}
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
