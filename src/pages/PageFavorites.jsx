// Importing useEffect and useState hooks from React
import { useEffect, useState } from 'react';

// Importing useSelector and useDispatch hooks from React Redux
import { useSelector, useDispatch } from 'react-redux';

// Importing action creators for notification handling
import { setMessage, clearMessage } from '../features/notification/notificationSlice';

// Importing fetchMovieDetails function from movieApi file
import { fetchMovieDetails } from '../api/movieApi';

// Importing the MovieList component
import MovieList from '../components/MovieList';

// Importing the SCSS file for styling
import '../styles/PageFavorites.scss';

// PageFavorites component definition
function PageFavorites() {
  const favorites = useSelector((state) => state.user.favorites); // Getting favorite movies from Redux store
  const dispatch = useDispatch(); // useDispatch hook for dispatching actions
  const message = useSelector(state => state.notification.message); // Getting notification message from Redux store

  const [favoriteMovies, setFavoriteMovies] = useState([]); // Using the useState hook to manage state for favorite movies

  // Fetching favorite movies when the component mounts or when favorites array changes
  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || []; // Getting favorite movie IDs from localStorage
      const favoriteMovies = await Promise.all(favoriteIds.map(fetchMovieDetails)); // Fetching details for favorite movies
      setFavoriteMovies(favoriteMovies.filter(movie => movie && favorites.includes(movie.id))); // Filtering out movies that are not in favorites array
    };

    fetchFavoriteMovies(); // Calling fetchFavoriteMovies function
  }, [favorites]); // Dependency array with favorites, so UseEffect runs when favorites array changes

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
    <div className="page-favorites-container"> {/* Container for the favorites page */}
      <div className="title-message">
        <h3>Your Favorites</h3> {/* Heading for the favorites section */}
        <div id="message">
          {message && <span>{message}</span>}
        </div>
      </div>
      <div className="line"></div> {/* Horizontal line separator */}
      {favorites.length === 0 ? ( // Conditional rendering when favorites array is empty
        <div className="empty-favorites-container"> {/* Container for displaying message when favorites array is empty */}
          <p>You haven&apos;t added any movies to your Favorites List yet!</p> {/* Message when favorites array is empty */}
          <div className="favorites-instructions"> {/* Instructions for adding movies to favorites */}
            <p>Create your Favorites List by clicking the</p> 
            <div className="heart favorite"></div> {/* Heart icon */}
            <p>button by each movie.</p>
          </div>
        </div>
      ) : (
        <MovieList id="movie-list-component" movies={favoriteMovies} handleListAction={handleListAction}/> // Rendering MovieList component with favoriteMovies when favorites array is not empty
      )}
      <div className="line"></div> {/* Horizontal line separator */}
    </div>
  );
}

// Export the PageFavorites component
export default PageFavorites;
