
import Navbar from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { VideoPlayer } from "@/app/components/details/moviedetails/VideoPlayer";
import { SimilarSeriesGrid } from "@/app/components/series/details/onboarding/Similarseriesgrid";
import { SeriesHeader } from "@/app/components/series/details/onboarding/Seriesheader";
import { getDetails, getSimilar } from "@/app/lib/tmdb/tv";



export default async function OnboardingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

   const [series, similar] = await Promise.all([
    getDetails(Number(id)),
    getSimilar(Number(id)),
  ]);

  return(

    <div className="flex flex-col w-full md:w-[85%] lg:w-[70%] mx-auto min-h-screen">
      <Navbar />

        <SeriesHeader 

        id={series.id}
        name={series.name}
        tagline={series.tagline}
        overview={series.overview}
        poster_path={series.poster_path}
        backdrop_path={series.backdrop_path}
        first_air_date={series.first_air_date}
        vote_average={series.vote_average}
        vote_count={series.vote_count}
        genres={series.genres}
        number_of_episodes={series.number_of_episodes}
        number_of_seasons={series.number_of_seasons}
        
        />
    
      <SimilarSeriesGrid series={similar} />

      <footer>
        <Footer />
      </footer>
    </div>
  );
}