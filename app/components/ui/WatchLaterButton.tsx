"use client"

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { isWatchlisted, addToWatchlist, removeFromWatchlist } from "@/app/lib/services/watchlist.services";

interface Props {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    mediaType?: "movie" | "tv";
    className?: string;
}

export function WatchLaterButton({ id, title, overview, poster_path, release_date, mediaType = "movie", className = "" }: Props) {
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        isWatchlisted(id, mediaType).then(setIsBookmarked);
    }, [id, mediaType]);

    async function toggle(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (isBookmarked) {
            await removeFromWatchlist(id, mediaType);
        } else {
            await addToWatchlist({ id, title, overview, poster_path, release_date }, mediaType);
        }
        setIsBookmarked(!isBookmarked);
    }

    return (
        <button
            onClick={toggle}
            className={`flex items-center cursor-pointer gap-1.5 px-2.5 py-1 rounded-full transition text-xs ${isBookmarked ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-background/60 backdrop-blur-sm text-foreground/70 border border-foreground/20 hover:bg-background/80 hover:text-foreground hover:border-foreground/40"} ${className}`}
        >
            <FontAwesomeIcon icon={isBookmarked ? faBookmarkSolid : faBookmark} className="text-xs" />
            {isBookmarked ? "Saved" : "Watch Later"}
        </button>
    );
}
