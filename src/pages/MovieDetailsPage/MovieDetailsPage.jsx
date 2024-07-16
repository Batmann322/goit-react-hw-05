import React, { useState, useEffect } from "react";
import {
  useParams,
  Link,
  Route,
  useRouteMatch,
  useHistory,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";
import { getImageUrl } from "../../payments-api";

export default function MovieDetalsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { url, path } = useRouteMatch();
  const history = useHistory();
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

  const goBack = () => {
    if (location.state && location.state.from) {
      history.push(location.state.from);
    } else {
      history.push("/movies");
    }
  };

  return (
    <div>
      {movie && (
        <>
          <button onClick={goBack}>Go back</button>
          <h1>{movie.title}</h1>
          <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
          <p>{movie.overview}</p>
          <ul>
            <li>
              <Link to={`${url}/cast`}>Cast</Link>
            </li>
            <li>
              <Link to={`${url}/reviews`}>Reviews</Link>
            </li>
          </ul>
          <Route path={`${path}/cast`} component={MovieCast} />
          <Route path={`${path}/reviews`} component={MovieReviews} />
        </>
      )}
    </div>
  );
}
