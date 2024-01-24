import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import { fetchMovieDetails } from '../api/movieApi';
import '../styles/PageFavorites.scss';

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
    <div className="page-favorites-container">
      <h3>Your Favorites</h3>
      <div className="line"></div>
      {favorites.length === 0 ? (
        <div className="empty-favorites-container">
          <p>You have not added any movies to your Favorites List yet!</p>
          <div className="favorites-instructions"> 
            Create your Favorites List by clicking the
            <div className="heart favorite"></div>
            button by each movie.
          </div>
        </div>
      ) : (
        <MovieList movies={favorites} />
      )}
      <div className="line"></div>
    </div>
  );
}

export default PageFavorites;

