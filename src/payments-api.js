import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common[
  "Authorization"
] = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjYjdlMjZjYTBiNThiYWZjMzY5YmRmOWI0M2QwOTY2ZiIsIm5iZiI6MTcyMTQ5NDIxNC4xMzE2MTksInN1YiI6IjY2OTAwZGM0MWNhNjU2ZmY4NTk3YjY3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MCrwWJgd6Nkzzzg7fpYT8jIsAaxEhxPLdNnmS6u9QQE`;
axios.defaults.params = {
  api_key: "cb7e26ca0b58bafc369bdf9b43d0966f",
};
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const IMAGE_SIZE = "w300";

export const getTrendingMovies = async () => {
  const response = await axios.get("/trending/movie/day");
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get("/search/movie", { params: { query } });
  return response.data.results;
};

export const getMovieDetails = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`);
  return response.data;
};

export const getMovieCast = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const getMovieReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};

export const getImageUrl = (filePath) => {
  return `${IMAGE_BASE_URL}/${IMAGE_SIZE}${filePath}`;
};
