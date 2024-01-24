import axios from 'axios';

const apiKey = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;
const baseUrl = 'https://api.themoviedb.org/3';

// Fetch popular movies
export const fetchPopularMovies = async () => {
  try {
    const res = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`);
    return res.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    return [];
  }
};

// Fetch movie details by ID
export const fetchMovieDetails = async (movieId) => {
  try {
    const res = await axios.get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching details for movie ID ${movieId}:`, error);
    return null;
  }
};

// Fetch top-rated movies
export const fetchTopRatedMovies = async () => {
  try {
    const res = await axios.get(`${baseUrl}/movie/top_rated?api_key=${apiKey}`);
    return res.data.results;
  } catch (error) {
    console.error('Error fetching top-rated movies:', error);
    return [];
  }
};

// Fetch now-playing movies
export const fetchNowPlayingMovies = async () => {
  try {
    const res = await axios.get(`${baseUrl}/movie/now_playing?api_key=${apiKey}`);
    return res.data.results;
  } catch (error) {
    console.error('Error fetching now-playing movies:', error);
    return [];
  }
};

// Fetch upcoming movies
export const fetchUpcomingMovies = async () => {
  try {
    const res = await axios.get(`${baseUrl}/movie/upcoming?api_key=${apiKey}`);
    return res.data.results;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
};
