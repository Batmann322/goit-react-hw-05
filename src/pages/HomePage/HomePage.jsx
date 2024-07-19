import React, { useState, useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { getTrendingMovies } from "../../payments-api";
import css from "./HomePage.module.css";

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
    <>
      <h1 className={css.titel}>Trending Movies</h1>
      <div className={css.container}>
        <MovieList movies={movies} />
      </div>
    </>
  );
}
