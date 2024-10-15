// src/components/MovieCard.ts
import { Movie } from "../types.js";
import { showMovieDetails } from "./MovieDetails.js";

export function createMovieCard(movie: Movie): HTMLElement {
  const movieCard = document.createElement("div");
  movieCard.className = `movie-card`;
  movieCard.id = `movie-card-${movie.id}`;

  const poster = document.createElement("img");
  poster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
  poster.alt = movie.title;

  const title = document.createElement("h3");
  title.innerText = movie.title;

  const year = document.createElement("p");
  year.innerText = `Year: ${new Date(movie.release_date).getFullYear()}`;

  const genre = document.createElement("p");
  genre.innerText = `Genre: ${movie.genre_ids}`;

  const vote = document.createElement("p");
  vote.innerText = `Rating: ${movie.vote_average}/10`;

  const overview = document.createElement("p");
  overview.innerText = `Overview: ${movie.overview}`;

  movieCard.appendChild(poster);
  movieCard.appendChild(title);
  movieCard.appendChild(year);
  movieCard.appendChild(genre);
  movieCard.appendChild(vote);
  movieCard.appendChild(overview);

  movieCard.addEventListener("click", () => {
    // Change URL without reloading the page // Optional - might delete
    const newUrl = `/movie/${movie.id}`;
    history.pushState({ movieId: movie.id }, movie.title, newUrl);

    showMovieDetails(movie.id);
  });

  return movieCard;
}
