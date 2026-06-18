import Image from "next/image";
import Link from "next/link";
import Icon from "../../public/eclipse.svg";

export function Footer() {
    return (
        <footer className="w-full mt-16 border-t border-foreground/10 py-12">

            <div className="grid grid-cols-2 md:grid-cols-3 gap-10 px-6">

                {/* Brand */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <Image src={Icon} alt="Eclipse Logo" width={24} height={24} />
                        <span className="text-foreground font-bold tracking-widest uppercase text-sm">Eclipse</span>
                    </div>
                    <p className="text-foreground/40 text-xs leading-relaxed">
                        Your ultimate destination for free movies and TV shows streaming.
                    </p>
                </div>

                {/* Browse */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-foreground text-xs font-bold tracking-widest uppercase">Browse</h4>
                    <div className="flex flex-col gap-2">
                        <Link href="/homepage/search" className="text-foreground/50 text-sm hover:text-foreground transition">Search</Link>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="text-foreground/30 text-xs leading-relaxed">
                        This website is for <strong>educational and project-building purposes only</strong>. Not intended for commercial use.
                    </p>
                </div>

                {/* Account */}
                {/* 
                <div className="flex flex-col gap-3">
                    <h4 className="text-foreground text-xs font-bold tracking-widest uppercase">Account</h4>
                    <div className="flex flex-col gap-2">
                        <Link href="/" className="text-foreground/50 text-sm hover:text-foreground transition">Login</Link>
                        <Link href="/" className="text-foreground/50 text-sm hover:text-foreground transition">Sign Up</Link>
                    </div>
                </div>
                */}

            </div>

            {/* Bottom */}
            <div className="border-t border-foreground/10 mt-10 pt-6 px-6 flex flex-col md:flex-row items-center justify-between gap-2">
                <p className="text-foreground/20 text-xs">
                    © {new Date().getFullYear()} Eclipse. All Rights Reserved.
                </p>
                <div className="flex items-center gap-4 text-foreground/20 text-xs">
                    <Link href="/" className="hover:text-foreground/50 transition">Terms & Conditions</Link>
                    <span>|</span>
                    <Link href="/" className="hover:text-foreground/50 transition">Privacy Policy</Link>
                </div>
            </div>

        </footer>
    );
}