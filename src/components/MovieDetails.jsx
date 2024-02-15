import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorites,
  removeFromFavorites,
  addToWatchList,
  removeFromWatchList
} from '../features/user/userSlice';
import "../styles/MovieDetails.scss";

function MovieDetails({ movie }) {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.user.favorites);
  const watchlist = useSelector((state) => state.user.watchlist);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isInWatchList, setIsInWatchList] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.includes(movie.id));
    setIsInWatchList(watchlist.includes(movie.id));
  }, [favorites, watchlist, movie.id]);

  const toggleFavorite = () =>{
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie.id));
    }
    setIsFavorite(!isFavorite);
  };

  const toggleWatchList = () => {
    if (isInWatchList) {
      dispatch(removeFromWatchList(movie.id));
    } else {
      dispatch(addToWatchList(movie.id));
    }
  }

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
        <div id="movie-details-data"> 
          <div className="favorite-watchlist">
              <button onClick={toggleFavorite} title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
                  <p className='favorite-label'>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</p>
                  <div className={`heart ${isFavorite ? 'favorite' : ''}`}></div>
              </button>
              <button onClick={toggleWatchList} title={isInWatchList ? 'Remove from Watch List' : 'Add to Watch List'} className="plus-sign-button">
                  <p className="watch-list-label">{isInWatchList ? 'Remove from Watch List' : 'Add to Watch List'}</p>
                  <div className={`plus-sign ${isInWatchList ? 'watchlist' : ''}`}></div>
              </button>
          </div>
          <div>
            <p>{overview}</p>
            <div className="release-rating">

                <div className="release-date-label">Release Date: </div>
                <div className="release-date-data">{dateFormat(release_date, "mmm dS, yyyy")}</div>
                <p className="rating-label">Rating: </p>
                <div className="star-container">{generateStars()}</div>
                <p className="rating-percentage">({(vote_average*10).toFixed(1)}%)</p>
              <div className='rating-container'></div>
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
