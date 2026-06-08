import { CardPanel } from "../components/Cardpanel";
import { MoviePanel } from "../components/MoviePanel";
import { Navbar } from "../components/Navbar";
import { TrendingPanel } from "../components/TrendingPanel";
import {Footer} from '../components/Footer'
import { TopRatedPanel } from "../components/TopRatedPanel";

export default function Homepage() {
  return (
    <div className="flex flex-col w-[70%] mx-auto min-h-screen">
      <Navbar />
      <CardPanel />
      <MoviePanel />
      <TrendingPanel />
      <TopRatedPanel />
      <footer>
        <Footer />
      </footer>
    </div>
  );
}