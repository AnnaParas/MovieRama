var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// src/app.ts
import { getNowPlayingMovies, searchMovies } from "./services/movieService.js";
import { createMovieCard } from "./components/MovieCard.js";
import { setupInfiniteScroll } from "./utils/infiniteScroll.js";
let currentPage = 1;
let query = "";
function loadMovies() {
    return __awaiter(this, void 0, void 0, function* () {
        const movieList = document.getElementById("movie-list");
        const data = query
            ? yield searchMovies(query, currentPage)
            : yield getNowPlayingMovies(currentPage);
        data.results.forEach((movie) => {
            const movieCard = createMovieCard(movie);
            movieList.appendChild(movieCard);
        });
    });
}
function init() {
    const searchBox = document.getElementById("search-box");
    const inTheaters = document.getElementById("banner");
    // Extracts the search term from the search input
    // Clears the movie list
    // Loads again the movies, with the new data
    searchBox.addEventListener("input", () => {
        query = searchBox.value;
        currentPage = 1;
        document.getElementById("movie-list").innerHTML = "";
        loadMovies();
    });
    // Adds a click event listener to the banner
    // Clears the movie list
    // Resets URL
    // Loads again the movie list
    inTheaters.addEventListener("click", () => {
        currentPage = 1;
        document.getElementById("movie-list").innerHTML = "";
        history.pushState({}, "", "/");
        query = "";
        searchBox.innerHTML = " ";
        loadMovies();
    });
    loadMovies();
    setupInfiniteScroll(() => {
        currentPage += 1;
        loadMovies();
    });
}
document.addEventListener("DOMContentLoaded", init);
