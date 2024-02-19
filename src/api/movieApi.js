import axios from 'axios';

// API key for accessing TMDB API
const apiKey = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;

// Base URL for TMDB API
const baseUrl = 'https://api.themoviedb.org/3';

export const fetchSearchedMovies = async (searchQuery) => {
  try {
    // Build the URL for the search query
    const url = searchQuery
      ? `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchQuery)}`
      : `${baseUrl}/movie/popular?api_key=${apiKey}`;
    const res = await axios.get(url);
    return res.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
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
