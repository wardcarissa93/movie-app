import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import { fetchMovieDetails } from '../api/movieApi';
import { useSelector } from 'react-redux';
import '../styles/PageFavorites.scss';

function PageFavorites() {
  const favorites = useSelector((state) => state.user.favorites);

  // Corrected the useState hook
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
      const favoriteMovies = await Promise.all(favoriteIds.map(fetchMovieDetails));
      setFavoriteMovies(favoriteMovies.filter(movie => movie && favorites.includes(movie.id)));
    };

    fetchFavoriteMovies();
  }, [favorites]);

  return (
    <div className="page-favorites-container">
      <h3>Your Favorites</h3>
      <div className="line"></div>
      {favorites.length === 0 ? (
        <div className="empty-favorites-container">
          <p>You haven&apos;t added any movies to your Favorites List yet!</p>
          <div className="favorites-instructions">
            <p>Create your Favorites List by clicking the</p> 
            <div className="heart favorite"></div>
            <p>button by each movie.</p>
          </div>
        </div>
      ) : (
        <MovieList movies={favoriteMovies} hideUnfavorited={true} />
      )}
      <div className="line"></div>
    </div>
  );
}

export default PageFavorites;
