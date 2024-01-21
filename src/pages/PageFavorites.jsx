import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Retrieve favorited movies from local storage
    const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
    // Fetch detailed movie information from TMDB using the movie IDs
    const favoriteMovies = favoriteIds.map(id => ({
      id,
      title: `Movie ${id}`,
      releaseDate: '2022-01-01',
      rating: 75,
      posterUrl: 'https://example.com/poster.jpg',
    }));
    setFavorites(favoriteMovies);
  }, []);

  return (
    <div>
      <h2>Favorites Page</h2>
      <MovieList movies={favorites} />
    </div>
  );
}

export default FavoritesPage;

