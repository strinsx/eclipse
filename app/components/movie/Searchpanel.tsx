"use client"

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { WatchLaterButton } from "@/app/components/ui/WatchLaterButton";

interface SearchResult {
    id: number;
    title: string;
    poster_path: string | null;
    media_type: "movie" | "tv";
    release_date?: string;
    first_air_date?: string;
}

export function Searchpanel() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const router = useRouter();

    const fetchResults = useCallback(async (q: string) => {
        if (!q.trim()) {
            setResults([]);
            return;
        }
        try {
            const res = await fetch(`/api/search?query=${encodeURIComponent(q)}`);
            const data = await res.json();
            setResults((data.results || []).slice(0, 7));
        } catch {
            setResults([]);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => fetchResults(query), 300);
        return () => clearTimeout(timer);
    }, [query, fetchResults]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && query.trim()) {
            router.push(`/homepage/search?query=${encodeURIComponent(query.trim())}`);
        }
    };

    return (
        <div className="m-3 py-6">
            <input
                type="text"
                placeholder="Search movies & series..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full px-4 py-3 rounded-xl bg-foreground/0 text-foreground placeholder-foreground/40 border border-foreground/20 outline-none focus:border-foreground/50 transition"
            />

            {results.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-6">
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
                                    delay: index * 0.04,
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

                                    {/* Watch later button */}
                                    <div className="absolute bottom-2 right-2 z-20 opacity-0 group-hover:opacity-100 transition duration-300" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
                                        <WatchLaterButton id={item.id} title={item.title} overview="" poster_path={item.poster_path ?? ""} release_date={(item.release_date || item.first_air_date || "")} mediaType={item.media_type} />
                                    </div>
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
