import Navbar from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { WatchlistsCardPanel } from "@/app/components/watchlists/WatchlistsCardPanel";




export default function WatchLists() {
    return (
        <>
        <div className="flex flex-col w-full px-4 md:px-0 md:w-[85%] lg:w-[70%] mx-auto min-h-screen">

            <Navbar />

            <WatchlistsCardPanel />

            <footer>
                <Footer />
            </footer>

         </div>
        </>
    );
}