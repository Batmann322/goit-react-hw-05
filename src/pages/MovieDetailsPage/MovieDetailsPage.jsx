import React, { useState, useEffect, Suspense, useRef } from "react";
import {
  useParams,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import { getImageUrl } from "../../payments-api";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetalsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const backLinkRef = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(`/movie/${movieId}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjdlMjZjYTBiNThiYWZjMzY5YmRmOWI0M2QwOTY2ZiIsIm5iZiI6MTcyMTQ5NDIxNC4xMzE2MTksInN1YiI6IjY2OTAwZGM0MWNhNjU2ZmY4NTk3YjY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MCrwWJgd6Nkzzzg7fpYT8jIsAaxEhxPLdNnmS6u9QQE`,
        },
      });
      setMovie(response.data);
    };
    fetchMovieDetails();
  }, [movieId]);

  const goBack = () => {
    navigate(backLinkRef.current);
  };

  return (
    <div>
      {movie && (
        <>
          <button onClick={goBack}>Go back</button>
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
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </div>
        </>
      )}
    </div>
  );
}
