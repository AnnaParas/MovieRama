// src/components/MovieDetails.ts
import {
  getMovieDetails,
  getMovieVideos,
  getMovieReviews,
  getSimilarMovies,
} from "../services/movieService.js";
import { Movie } from "../types.js";

export async function showMovieDetails(movieId: number) {
  // Find the movie card element that corresponds to this movie ID
  const movieCard = document.getElementById(`movie-card-${movieId}`)!;

  const movieDetails = await getMovieDetails(movieId);
  const movieVideos = await getMovieVideos(movieId);
  const movieReviews = await getMovieReviews(movieId);
  const similarMovies = await getSimilarMovies(movieId);

  // Get the modal elements
  const modal = document.getElementById("movie-modal")!;
  const modalDetails = document.getElementById("modal-details")!;
  const closeButton = document.querySelector(".close-btn")!;

  const detailsDiv = document.createElement("div");
  detailsDiv.className = "movie-details";

  const title = document.createElement("h2");
  title.innerText = movieDetails.title;

  const overview = document.createElement("p");
  overview.innerText = movieDetails.overview;

  const genres = document.createElement("p");
  genres.innerText = `Genres: ${movieDetails.genres
    .map((g: any) => g.name)
    .join(", ")}`;

  // Display trailer if available
  const trailer = movieVideos.results.find(
    (video: any) => video.type === "Trailer"
  );
  if (trailer) {
    const trailerLink = document.createElement("a");
    trailerLink.href = `https://www.youtube.com/watch?v=${trailer.key}`;
    trailerLink.innerText = "Watch Trailer";
    trailerLink.target = "_blank";
    detailsDiv.appendChild(trailerLink);
  }

  // Add reviews

  const reviewsDiv = document.createElement("div");
  reviewsDiv.classList.add("reviews-container");
  reviewsDiv.innerText = "Reviews";
  if (movieReviews !== null) {
    movieReviews.results.slice(0, 2).forEach((review: any) => {
      const reviewDiv = document.createElement("div");
      reviewDiv.classList.add("review");
      reviewDiv.innerText = `${review.author}: ${review.content}`;
      reviewsDiv.appendChild(reviewDiv);
    });
  } else {
    movieReviews.innerText = `No reviews available`;
  }

  // Add similar movies
  const similarMoviesDiv = document.createElement("div");
  similarMoviesDiv.className = "similar-movies";
  similarMoviesDiv.innerText = "Similar Movies:";
  similarMovies.results.forEach((movie: Movie) => {
    const similarMovie = document.createElement("p");
    similarMovie.innerText = movie.title;
    similarMoviesDiv.appendChild(similarMovie);
  });

  detailsDiv.appendChild(title);
  detailsDiv.appendChild(overview);
  detailsDiv.appendChild(genres);
  detailsDiv.appendChild(reviewsDiv);
  detailsDiv.appendChild(similarMoviesDiv);

  modalDetails.innerHTML = "";
  modalDetails.appendChild(detailsDiv);

  // Show the modal
  modal.style.display = "flex";

  // Close modal when clicking the close button
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside of the content
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}
