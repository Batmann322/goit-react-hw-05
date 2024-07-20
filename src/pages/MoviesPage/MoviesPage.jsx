import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import axios from "axios";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchMovies = async () => {
      const query = searchParams.get("query") || "";
      if (query) {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}`,
          {
            headers: {
              Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjdlMjZjYTBiNThiYWZjMzY5YmRmOWI0M2QwOTY2ZiIsIm5iZiI6MTcyMTQ5NDIxNC4xMzE2MTksInN1YiI6IjY2OTAwZGM0MWNhNjU2ZmY4NTk3YjY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MCrwWJgd6Nkzzzg7fpYT8jIsAaxEhxPLdNnmS6u9QQE`,
            },
          }
        );
        setMovies(response.data.results);
      }
    };
    fetchMovies();
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ query });
  };

  return (
    <div>
      <form onSubmit={handleSearch} className={css.container}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies"
        />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}
