// src/types.ts

export interface Movie {
  id: number;
  title: string;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  overview: string;
  poster_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number;
}

export interface Video {
  id: string;
  key: string;
  site: string;
  type: string;
}

export interface Review {
  id: string;
  author: string;
  content: string;
}
