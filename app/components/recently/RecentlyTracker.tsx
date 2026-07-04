"use client"

import { useEffect, useRef } from "react";
import { addToRecentlyWatched } from "@/app/lib/services/recently.services";

interface Props {
  tmdb_id: number;
  media_type: "movie" | "tv";
  title: string;
  overview: string;
  backdrop_path: string;
  release_date: string;
  season_number?: number | null;
  episode_number?: number | null;
}

export function RecentlyTracker({
  tmdb_id,
  media_type,
  title,
  overview,
  backdrop_path,
  release_date,
  season_number,
  episode_number,
}: Props) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    addToRecentlyWatched({
      tmdb_id,
      media_type,
      title,
      overview,
      backdrop_path,
      release_date,
      season_number,
      episode_number,
    });
  }, [tmdb_id, media_type, title, overview, backdrop_path, release_date, season_number, episode_number]);

  return null;
}
