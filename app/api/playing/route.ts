
import { nowPlaying } from "@/app/lib/tmdb";

export async function GET() {

    try {

        return Response.json(await nowPlaying());
        
    } catch (error) {

        return Response.json(
            {error: 'failed to fetch'},
            {status: 500}
        )
        
    }

}