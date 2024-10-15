var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// src/services/movieService.ts
const API_KEY = "bc50218d91157b1ba4f142ef7baaa6a0";
const API_URL = "https://api.themoviedb.org/3";
export const getNowPlayingMovies = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1) {
    const response = yield fetch(`${API_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`);
    return response.json();
});
export const searchMovies = (query_1, ...args_1) => __awaiter(void 0, [query_1, ...args_1], void 0, function* (query, page = 1) {
    const response = yield fetch(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    return response.json();
});
export const getMovieDetails = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_URL}/movie/${movieId}?api_key=${API_KEY}`);
    return response.json();
});
export const getMovieVideos = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);
    return response.json();
});
export const getMovieReviews = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
    return response.json();
});
export const getSimilarMovies = (movieId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(`${API_URL}/movie/${movieId}/similar?api_key=${API_KEY}`);
    return response.json();
});
