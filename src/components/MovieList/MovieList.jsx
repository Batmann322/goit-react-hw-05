import { Link, useLocation } from "react-router-dom";
import { getImageUrl } from "../../payments-api";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  return (
    <ul className={css.container}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link
            to={{
              pathname: `/movies/${movie.id}`,
              state: { from: location },
            }}
          >
            <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
