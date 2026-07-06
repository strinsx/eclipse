"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { getRecentlyWatched } from "@/app/lib/services/recently.services";
import { ContinueWatching } from "@/app/types/movie";

function timeAgo(dateStr: string): string {
  const now = Date.now();
  const diff = now - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function RecentlyWatched() {
  const [items, setItems] = useState<ContinueWatching[]>([]);

  useEffect(() => {
    getRecentlyWatched().then(setItems);
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="m-3 py-6">
      <h1 className="text-white text-lg font-bold tracking-tight mb-4">
        Recently Watched
      </h1>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {items.map((item, index) => (
          <motion.div
            key={`${item.id}-${item.season_number}-${item.episode_number}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
            className="flex-shrink-0 w-[280px]"
          >
            <Link href={`/homepage/${item.season_number > 0 ? "series" : "movies"}/${item.id}/watch`}>
              <div className="group relative flex flex-col cursor-pointer">
                  <div className="relative overflow-hidden rounded-xl aspect-video">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                      alt={item.title}
                      fill
                      className="object-cover transition duration-300 saturate-60 group-hover:saturate-160 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center group-hover:bg-white/40 transition-all duration-200">
                        <FontAwesomeIcon icon={faPlay} className="text-white text-lg ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  </div>

                <div className="pt-2 px-1">
                  <h3 className="text-foreground text-sm font-semibold line-clamp-1">
                    {item.title}
                  </h3>
                  <span className="text-foreground/40 text-xs mt-0.5 block">
                    Watched {timeAgo(item.updated_at)}
                  </span>
                  {item.season_number > 0 && (
                    <span className="text-foreground/50 text-xs mt-0.5 block">
                      S{item.season_number} EP{item.episode_number}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
