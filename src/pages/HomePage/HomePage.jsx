import React, { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getTrendingMovies } from "../../payments-api";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getTrendingMovies();
      setMovies(movies);
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}
