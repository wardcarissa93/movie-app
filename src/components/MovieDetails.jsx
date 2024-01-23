import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import "../styles/MovieDetails.scss";

function MovieDetails({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchList, setIsInWatchList] = useState(false);

  useEffect(() => {
    // Check if movie is in favorites and watchlist in local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const watchList = JSON.parse(localStorage.getItem('watchList')) || [];

    setIsFavorite(favorites.includes(movie.id));
    setIsInWatchList(watchList.includes(movie.id));
  }, [movie.id]); 

  const toggleFavorite = () => {
    // Toggle favorite status and update local storage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (isFavorite) {
      const updatedFavorites = favorites.filter(id => id !== movie.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      localStorage.setItem('favorites', JSON.stringify([...favorites, movie.id]));
    }
    setIsFavorite(!isFavorite);
  };

  const toggleWatchList = () => {
    // Toggle watchlist status and update local storage
    const watchList = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (isInWatchList) {
      const updatedWatchList = watchList.filter(id => id !== movie.id);
      localStorage.setItem('watchList', JSON.stringify(updatedWatchList));
    } else {
      localStorage.setItem('watchList', JSON.stringify([...watchList, movie.id]));
    }
    setIsInWatchList(!isInWatchList);
  };

  const generateStars = () => {
    const numberOfStars = Math.round(movie.vote_average);
    return Array.from({ length: numberOfStars }, (_unused, index) => (
      <div key={index} className="star"></div>
    ));
  };

  let { title, overview, poster_path, release_date, vote_average } = movie;

  return (
    <div id="details-wrapper">
      <h3>Details for <i>{title}</i></h3>
      <div className="line"></div>
      <div id="movie-details-wrapper">
        <div>
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
        </div>
        <div>
          <div className="favorite-watchlist">
              <button onClick={toggleFavorite} title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
                  <p className='favorite-label'>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</p>
                  <div className="heart"></div>
              </button>
              <button onClick={toggleWatchList} title={isInWatchList ? 'Remove from Watch List' : 'Add to Watch List'} className="plus-sign-button">
                  <p className="watch-list-label">{isInWatchList ? 'Remove from Watch List' : 'Add to Watch List'}</p>
                  <div className="plus-sign"></div>
              </button>
          </div>
          <div>
            <p>{overview}</p>
            <div className="release-rating">
              <div className="release-container">
                <div>Release Date: </div>
                <div>{dateFormat(release_date, "mmm dS, yyyy")}</div>
              </div>
              <div className='rating-container'><p className="rating-label">Rating: </p><div className="star-container">{generateStars()}</div><p className="rating-label">({(vote_average*10).toFixed(1)}%)</p></div>
            </div>
          </div>
        </div>
      </div>
      <div className="line"></div>
    </div>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    // Add other necessary properties
  }).isRequired,
};

export default MovieDetails;
