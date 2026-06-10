

const API_KEY = process.env.TMDB_KEY;


export async function getPopularMovies() {

    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`)
    const data = await response.json();

    return (data);

}


export async function getGenres() {

    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en`);
    const data = await response.json();
    return (data);

}

export async function getSimilar(movieId: number) {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`) 

        //MOCK DATA MOVIEID STILL 550

        const data = await response.json();
        return (data);
}

export async function getDetails(movieId: number) {

    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US';`)
    return await response.json();

}   

export async function searchbyID() {

    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=spiderman&api_key=${API_KEY}&include_adult=false&language=en-US&page=1`)
    const data = await response.json();
    return (data);


    // MOCK DATA FROM SPIDERMAN STILL NEED A LOOK INTO

}

export async function nowPlaying() {

    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
    const data = await response.json();
    return (data);

}

export async function Trending() {

        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&page=1`)
        const data = await response.json();
        return (data);

}

export async function getTopRated() {
    const response = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    );

    return response.json();
}