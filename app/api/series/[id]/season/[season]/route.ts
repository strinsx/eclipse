import { getSeasonDetail } from "@/app/lib/tmdb/tv";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string; season: string }> }
) {
    const { id, season } = await params;
    const data = await getSeasonDetail(Number(id), Number(season));
    return NextResponse.json(data);
}