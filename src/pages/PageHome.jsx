import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import { fetchPopularMovies } from '../api/movieApi';

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesData = async () => {
        const popularMovies = await fetchPopularMovies();
        setMovies(popularMovies);
    };

    fetchMoviesData();
  }, []);

  return (
    <MovieList movies={movies} />
  );
}

export default Home;
