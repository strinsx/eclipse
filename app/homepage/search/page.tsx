import { Suspense } from "react";
import { Navbar } from "@/app/components/GuestNavbar";
import { Footer } from "@/app/components/Footer";
import { SearchResults } from "./SearchResults";
import { Searchpanel } from "@/app/components/movie/Searchpanel";

export default function SearchPage() {
    return (
        <div className="flex flex-col w-full md:w-[85%] lg:w-[70%] mx-auto min-h-screen">
            <Navbar />
            <Suspense fallback={
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-foreground/50">Loading...</p>
                </div>
            }>

                <Searchpanel />
                <SearchResults />
            </Suspense>
            <Footer />
        </div>
    );
}
