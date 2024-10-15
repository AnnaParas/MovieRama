// src/app.ts
import { getNowPlayingMovies, searchMovies } from "./services/movieService.js";
import { createMovieCard } from "./components/MovieCard.js";
import { setupInfiniteScroll } from "./utils/infiniteScroll.js";

let currentPage = 1;
let query = "";

async function loadMovies() {
  const movieList = document.getElementById("movie-list")!;
  const data = query
    ? await searchMovies(query, currentPage)
    : await getNowPlayingMovies(currentPage);
  data.results.forEach((movie: any) => {
    const movieCard = createMovieCard(movie);
    movieList.appendChild(movieCard);
  });
}

function init() {
  const searchBox = document.getElementById("search-box") as HTMLInputElement;
  const inTheaters = document.getElementById("banner") as HTMLInputElement;

  // Extracts the search term from the search input
  // Clears the movie list
  // Loads again the movies, with the new data
  searchBox.addEventListener("input", () => {
    query = searchBox.value;
    currentPage = 1;
    document.getElementById("movie-list")!.innerHTML = "";
    loadMovies();
  });

  // Adds a click event listener to the banner
  // Clears the movie list
  // Resets URL
  // Loads again the movie list
  inTheaters.addEventListener("click", () => {
    currentPage = 1;
    document.getElementById("movie-list")!.innerHTML = "";
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
