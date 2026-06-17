import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUser } from "@fortawesome/free-solid-svg-icons";

interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

interface Props {
    cast: CastMember[];
}

export function TopCast({ cast }: Props) {
    return (
        <div className="py-6">
            <h2 className="text-foreground font-bold text-lg mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faUsers} className="text-lg" /> Top Cast
            </h2>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {cast.slice(0, 10).map((member) => (
                    <div
                        key={member.id}
                        className="flex-shrink-0 flex flex-col items-center gap-2 w-[90px] group cursor-pointer"
                    >
                        {/* Photo */}
                        <div className="relative w-[80px] h-[90px] rounded-xl overflow-hidden bg-foreground/10">
                            {member.profile_path ? (
                                <Image
                                    src={`https://image.tmdb.org/t/p/w185${member.profile_path}`}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition duration-300 saturate-60 group-hover:saturate-100"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-foreground/20 text-2xl">
                                    <FontAwesomeIcon icon={faUser} className="text-foreground/20 text-2xl" />
                                </div>
                            )}
                        </div>

                        {/* Name & character */}
                        <div className="text-center">
                            <p className="text-foreground text-xs font-semibold line-clamp-2 leading-tight">
                                {member.name}
                            </p>
                            <p className="text-foreground/40 text-xs line-clamp-1 mt-0.5">
                                {member.character}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
