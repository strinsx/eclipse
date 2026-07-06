import { CardPanel } from "../components/movie/Cardpanel";
import { MoviePanel } from "../components/movie/MoviePanel";
import  Navbar  from "../components/Navbar";
import { TrendingPanel } from "../components/movie/TrendingPanel";
import { Footer } from '../components/Footer'
import { TopRatedPanel } from "../components/movie/TopRatedPanel";
import { OnAirTv } from "../components/series/OnAir";
import { TrendingPanelTV } from "../components/series/TrendingPanelTV";
import { Searchpanel } from "../components/movie/Searchpanel";
import { RecentlyWatched } from "../components/recently/RecentlyWatched";
import { FamilyPanel } from "../components/movie/FamilyPanel";
import { isKidsProfile } from "../lib/tmdb/movie";
export default async function Homepage() {
  const kids = await isKidsProfile();
  return (
    <div className="flex flex-col w-full px-4 md:px-0 md:w-[85%] lg:w-[70%] mx-auto min-h-screen">
      <Navbar />
      <CardPanel />
      <Searchpanel />
      <RecentlyWatched />


      <MoviePanel />
      {kids && <FamilyPanel />}
      <TrendingPanel />
      <TopRatedPanel />
      <OnAirTv />
      <TrendingPanelTV />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}