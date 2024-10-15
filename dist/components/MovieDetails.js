var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// src/components/MovieDetails.ts
import { getMovieDetails, getMovieVideos, getMovieReviews, getSimilarMovies, } from "../services/movieService.js";
export function showMovieDetails(movieId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Find the movie card element that corresponds to this movie ID
        const movieCard = document.getElementById(`movie-card-${movieId}`);
        const movieDetails = yield getMovieDetails(movieId);
        const movieVideos = yield getMovieVideos(movieId);
        const movieReviews = yield getMovieReviews(movieId);
        const similarMovies = yield getSimilarMovies(movieId);
        // Get the modal elements
        const modal = document.getElementById("movie-modal");
        const modalDetails = document.getElementById("modal-details");
        const closeButton = document.querySelector(".close-btn");
        const detailsDiv = document.createElement("div");
        detailsDiv.className = "movie-details";
        const title = document.createElement("h2");
        title.innerText = movieDetails.title;
        const overview = document.createElement("p");
        overview.innerText = movieDetails.overview;
        const genres = document.createElement("p");
        genres.innerText = `Genres: ${movieDetails.genres
            .map((g) => g.name)
            .join(", ")}`;
        // Display trailer if available
        const trailer = movieVideos.results.find((video) => video.type === "Trailer");
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
            movieReviews.results.slice(0, 2).forEach((review) => {
                const reviewDiv = document.createElement("div");
                reviewDiv.classList.add("review");
                reviewDiv.innerText = `${review.author}: ${review.content}`;
                reviewsDiv.appendChild(reviewDiv);
            });
        }
        else {
            movieReviews.innerText = `No reviews available`;
        }
        // Add similar movies
        const similarMoviesDiv = document.createElement("div");
        similarMoviesDiv.className = "similar-movies";
        similarMoviesDiv.innerText = "Similar Movies:";
        similarMovies.results.forEach((movie) => {
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
    });
}
