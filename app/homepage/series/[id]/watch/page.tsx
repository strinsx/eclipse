// No "use client"
import { getDetails, getSimilar } from "@/app/lib/tmdb/tv";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { VideoPlayer } from "@/app/components/details/moviedetails/VideoPlayer";
import { SimilarMovies } from "@/app/components/details/moviedetails/SimilarMovies";
import { SeriesDetailsInfo } from "@/app/components/series/details/watch/SeriesDetails";
import { SeriesVideoPlayer } from "@/app/components/series/details/watch/SeriesVideoPlayer";


export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const series = await getDetails(Number(id));
  const similar = await getSimilar(Number(id));

  return (
    <div className="flex flex-col w-[70%] mx-auto min-h-screen">


      {/* Left — takes up most of the width */}
      <div className="flex-1 flex flex-col gap-4 min-w-0">

        <Navbar />

        <SeriesVideoPlayer 
        
        id={series.id}
        name={series.name}
        first_air_date={series.first_air_date}
        backdrop_path={series.backdrop_path}
        

        />

        <SeriesDetailsInfo 
        
        id={series.id}
        name={series.name}
        overview={series.overview}
        number_of_episodes={series.number_of_episodes}
        number_of_seasons={series.number_of_seasons}
        genres={series.genres}
        first_air_date={series.first_air_date}
        vote_average={series.vote_average}


        />


        <div className="flex justify-between mt-10">

          <div className="flex flex-col items-start">
               

          </div>

          {/* Right — fixed width similar to screenshot */}

        </div>

      </div>


      <footer>
        <Footer />
      </footer>

    </div>
  );
}