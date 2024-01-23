import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import { fetchMovieDetails } from '../api/movieApi';

function PageFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
      const favoriteMovies = await Promise.all(favoriteIds.map(fetchMovieDetails));
      setFavorites(favoriteMovies.filter(movie => movie)); // Filter out null values
    };

    fetchFavoriteMovies();
  }, []);

  return (
    <MovieList movies={favorites} />
  );
}

export default PageFavorites;

