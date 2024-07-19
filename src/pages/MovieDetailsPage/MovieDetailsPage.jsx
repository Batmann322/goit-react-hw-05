import React, { useState, useEffect, useRef, Suspense } from "react";
import {
  useParams,
  Link,
  Route,
  useLocation,
  Routes,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import { getImageUrl } from "../../payments-api";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetalsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjdlMjZjYTBiNThiYWZjMzY5YmRmOWI0M2QwOTY2ZiIsIm5iZiI6MTcyMTE1MzQzOS4xNDY2MjEsInN1YiI6IjY2OTAwZGM0MWNhNjU2ZmY4NTk3YjY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.QdZEaqamxrQBbCegj_V3o1nrfOxmFY5N14LwISssgSQ`,
          },
        }
      );
      setMovie(response.data);
    };
    fetchMovieDetails();
  }, [movieId]);

  const goBack = useRef(location?.state?.from ?? "/");

  return (
    <div>
      {movie && (
        <>
          <Link to={goBack.current}>Go back</Link>
          <div className={css.container}>
            <h1>{movie.title}</h1>
            <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
            <p>
              Release Date:
              <br /> {movie.release_date}
            </p>
            <p>
              Rating:
              <br /> {movie.vote_average}
            </p>
            <p>
              Overview:
              <br /> {movie.overview}
            </p>
            <ul>
              <li>
                <Link to={"cast"}>Cast</Link>
              </li>
              <li>
                <Link to={"reviews"}>Reviews</Link>
              </li>
            </ul>
            <Suspense>
              <Routes>
                <Route path={"cast"} element={<MovieCast />} />
                <Route path={"reviews"} element={<MovieReviews />} />
              </Routes>
            </Suspense>
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
}
