"use client"

import { useState, useEffect, useRef } from "react";
import { Series } from "@/app/types/tvshows";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

export function OnAirTv() {

    const [series, setSeries] = useState<Series[]>([]);
    const [xOffset, setXOffset] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const SCROLL_AMOUNT = 400;

    const fetchData = async () => {
        try {
            const response = await fetch('/api/series/on-air');
            const data = await response.json();
            setSeries(data.results);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const scrollLeft = () => {
        const maxScroll = 0;
        const newX = Math.min(xOffset + SCROLL_AMOUNT, maxScroll);
        setXOffset(newX);
        controls.start({
            x: newX,
            transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 }
        });
    };

    const scrollRight = () => {
        const containerWidth = containerRef.current?.scrollWidth ?? 0;
        const viewportWidth = containerRef.current?.parentElement?.clientWidth ?? 0;
        const maxScroll = -(containerWidth - viewportWidth);
        const newX = Math.max(xOffset - SCROLL_AMOUNT, maxScroll);
        setXOffset(newX);
        controls.start({
            x: newX,
            transition: { type: "spring", stiffness: 60, damping: 20, mass: 1 }
        });
    };

    return (
        <div className="m-3 py-6">
            <h1 className="text-foreground text-lg font-bold tracking-tight mb-4">
                Top Airing Series
            </h1>

            <div className="relative">

                {/* Left Button */}
                <motion.button
                    onClick={scrollLeft}
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 bg-foreground/10 backdrop-blur-sm text-foreground rounded-full w-10 h-10 flex items-center justify-center border border-foreground/20 cursor-pointer"
                >
                    ‹
                </motion.button>

                {/* Overflow wrapper */}
                <div className="overflow-hidden px-2">
                    <motion.div
                        ref={containerRef}
                        animate={controls}
                        className="flex gap-4"
                    >
                        {series.map((m, index) => (
                            <Link href={`/homepage/series/${m.id}/onboarding`} key={m.id}>

                                <motion.div
                                    key={m.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.05,
                                        ease: "easeOut"
                                    }}
                                    whileHover={{ y: -6 }}
                                    className="group relative flex-shrink-0 flex flex-col rounded-xl overflow-hidden cursor-pointer"
                                >
                                    {/* Poster */}
                                    <div className="relative overflow-hidden rounded-xl h-[240px] w-[160px]">
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                                            alt={m.name}
                                            fill
                                            className="object-cover transition duration-300 saturate-60 group-hover:saturate-160 group-hover:scale-105"
                                        />

                                        {/* Star badge */}
                                        <div className="absolute top-2 right-2 z-10 bg-background/60 backdrop-blur-sm text-amber-200 text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
                                            ★ {m.popularity.toFixed(1)}
                                        </div>

                                        {/* Bottom gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 z-10" />
                                    </div>

                                    {/* Info */}
                                    <div className="pt-2 px-1 w-[160px]">
                                        <h3 className="text-foreground text-sm font-semibold line-clamp-1">
                                            {m.name}
                                        </h3>
                                        <span className="text-foreground/50 text-xs">
                                            {/*  {m.release_date.slice(0, 4)} */}
                                        </span>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </motion.div>
                </div>

                {/* Right Button */}
                <motion.button
                    onClick={scrollRight}
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 bg-foreground/10 backdrop-blur-sm text-foreground rounded-full w-10 h-10 flex items-center justify-center border border-foreground/20 cursor-pointer"
                >
                    ›
                </motion.button>

            </div>
        </div>
    );
}