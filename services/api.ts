import axios from "axios";

export const TMDB_MOVIE = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_KEY,
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_KEY}`,
  },
};

export const fetchPopularMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_MOVIE.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_MOVIE.BASE_URL}/discover/movie`;

  const response = await axios.get(endpoint, {
    headers: TMDB_MOVIE.headers,
  });
  if (response.status >= 400) {
    throw new Error("failed to fetch");
  }
  return response.data
};