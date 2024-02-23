// Importing PropTypes for type-checking
import PropTypes from 'prop-types';

// Importing dateFormat for date formatting
import dateFormat from 'dateformat';

// Importing utility functions
import { useMovieStatus, generateStars, getPosterPath } from '../utilities/useMovieStatus';

// Importing useSelector and useDispatch hooks from React Redux
import { useSelector, useDispatch } from 'react-redux';

// Importing action creators for notification handling
import { setMessage, clearMessage } from '../features/notification/notificationSlice';

// Importing the SCSS file for styling
import "../styles/MovieDetails.scss";

// MovieDetails component definition
function MovieDetails({ movie }) {
    // Destructuring movie object
    const { id, title, overview, poster_path, release_date, vote_average } = movie;

    // Getting movie status using custom hook
    const { isFavorite, isInWatchList, toggleFavorite, toggleWatchList } = useMovieStatus(id);

    const dispatch = useDispatch(); // useDispatch hook for dispatching actions

    const message = useSelector(state => state.notification.message); // Getting notification message from Redux store

    // Function to handle adding or removing a movie from favorites/watchlist
    const handleListAction = (title, isAdding, listName) => {
        if (isAdding) {
            dispatch(setMessage(`'${title}' added to ${listName}`)); // Dispatching message when adding a movie
        } else {
            dispatch(setMessage(`'${title}' removed from ${listName}`)); // Dispatching message when removing a movie
        }
        setTimeout(() => {
            dispatch(clearMessage()); // Clear the message after 3 seconds
        }, 3000);
    };

    return (
        <div id="details-wrapper"> {/* Container for movie details */}
            <div id="title-message">
                <h3>Details for <i>{title}</i></h3> {/* Heading for movie details */}
                <div id="message">
                    {message && <span>{message}</span>}
                </div>
            </div>
            <div className="line"></div> {/* Horizontal line separator*/}
            <div id="movie-details-wrapper"> {/* Container for movie details */}
                <div>
                    <img src={getPosterPath(poster_path)} alt={title} /> {/* Movie poster */}
                </div>
                <div id="movie-details-data"> {/* Container for movie data */}
                    <div className="favorite-watchlist"> {/* Container for favorite and watchlist buttons */}
                        <button onClick={() => { toggleFavorite(); handleListAction(title, !isFavorite, 'Favorites'); }} title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
                            <p className='favorite-label'>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</p>
                            <div className={`heart ${isFavorite ? 'favorite' : ''}`}></div> {/* Heart icon for favorite */}
                        </button>
                        <button onClick={() => { toggleWatchList(); handleListAction(title, !isInWatchList, 'Watch List'); }} title={isInWatchList ? 'Remove from Watch List' : 'Add to Watch List'} className="plus-sign-button">
                            <p className="watch-list-label">{isInWatchList ? 'Remove from Watch List' : 'Add to Watch List'}</p>
                            <div className={`plus-sign ${isInWatchList ? 'watchlist' : ''}`}></div> {/* Plus sign icon for watchlist */}
                        </button>
                    </div>
                    <div>
                        <p>{overview}</p> {/* Movie overview */}
                        <div className="release-rating"> {/* Container for release date and rating */}
                            <div className="release-date-label">Release Date: </div>
                            <div className="release-date-data">{dateFormat(release_date, "mmm dS, yyyy")}</div> {/* Formatted release date */}
                            <p className="rating-label">Rating: </p>
                            <div className="star-container">{generateStars(vote_average)}</div> {/* Star rating */}
                            <p className="rating-percentage">({(vote_average*10).toFixed(1)}%)</p> {/* Rating percentage */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="line"></div> {/* Horizontal line separator */}
        </div>
    );
}

// PropTypes validation for the 'movie' prop
MovieDetails.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired, // 'id' is required and must be a number
        title: PropTypes.string.isRequired, // 'title' is required and must be a string
        overview: PropTypes.string.isRequired, // 'overview' is required and must be a string
        poster_path: PropTypes.string.isRequired, // 'poster_path' is required and must be a string
        release_date: PropTypes.string.isRequired, // 'release_date' is required and must be a string
        vote_average: PropTypes.number.isRequired, // 'vote_average' is required and must be a number
    }).isRequired, // 'movie' prop is required
};

// Export the MovieDetails component
export default MovieDetails;