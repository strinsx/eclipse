

const API_KEY = process.env.TMDB_KEY;


export async function getPopularTV() {

    const response = await fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`)
    const data = await response.json();

    return (data);

}

export async function getTrendingTV() {
    const response = await fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&language=en-US&page=1`)
    const data = await response.json();

    return (data);
}

export async function onAirTV() {

    const response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`)
    const data = await response.json();

    return (data);

}

export async function getDetails(id: number) {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US&page=1`)
    const data = await response.json();

    return (data);
}

export async function getSimilar(id: number) {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`)
    const data = await response.json();

    return (data.results);
}


export async function getEpisodesGroup(id: number) {
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}/episodes_groups?api_key=${API_KEY}&language=en-US&page=1`)
    const data = await response.json();
    return (data.results);
}