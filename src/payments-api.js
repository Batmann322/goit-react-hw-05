import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjdlMjZjYTBiNThiYWZjMzY5YmRmOWI0M2QwOTY2ZiIsIm5iZiI6MTcyMDk3ODA4My44NTUzOTYsInN1YiI6IjY2OTAwZGM0MWNhNjU2ZmY4NTk3YjY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OT6G5mCGNLJMH5fXnjRsJIIvDpPWIamXx4GcWvLIkXk";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const IMAGE_SIZE = "w500";

export const getTrendingMovies = async () => {
  const response = await axios.get("/trending/movie/day", {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get("/search/movie", {
    params: {
      query,
    },
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data;
};

export const getMovieCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });
  return response.data.results;
};

export const getImageUrl = (filePath) => {
  return `${IMAGE_BASE_URL}/${IMAGE_SIZE}${filePath}`;
};
