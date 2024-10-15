// src/services/movieService.ts
const API_KEY = "bc50218d91157b1ba4f142ef7baaa6a0";
const API_URL = "https://api.themoviedb.org/3";

export const getNowPlayingMovies = async (page: number = 1) => {
  const response = await fetch(
    `${API_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`
  );
  return response.json();
};

export const searchMovies = async (query: string, page: number = 1) => {
  const response = await fetch(
    `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  );
  return response.json();
};

export const getMovieDetails = async (movieId: number) => {
  const response = await fetch(
    `${API_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  return response.json();
};

export const getMovieVideos = async (movieId: number) => {
  const response = await fetch(
    `${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
  );
  return response.json();
};

export const getMovieReviews = async (movieId: number) => {
  const response = await fetch(
    `${API_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`
  );
  return response.json();
};

export const getSimilarMovies = async (movieId: number) => {
  const response = await fetch(
    `${API_URL}/movie/${movieId}/similar?api_key=${API_KEY}`
  );
  return response.json();
};
