// Import useState and useEffect hooks from React
import { useState, useEffect } from 'react';

// Import useDispatch and useSelector hooks from React Redux
import { useDispatch, useSelector } from 'react-redux';

// Import the MovieList component
import MovieList from '../components/MovieList';

// Importing fetch functions for movie categories from movieApi file
import { 
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies
} from '../api/movieApi';

// Importing action creator for setting selected category
import { setSelectedCategory } from '../features/movies/moviesSlice';

// PageHome component definition
function PageHome() {
  const [movies, setMovies] = useState([]); // State variable to store fetched movies
  const dispatch = useDispatch(); // useDispatch hook for dispatching actions
  const selectedCategory = useSelector(state => state.movies.selectedCategory); // Getting selected category from Redux store
  const [message, setMessage] = useState(''); // State variable for messages

  // Fetching movies data based on selected category when the component mounts or when selectedCategory changes
  useEffect(() => {
    const fetchMoviesData = async () => {
      let fetchedMovies = [];
      switch (selectedCategory) {
        case 'top_rated':
          fetchedMovies = await fetchTopRatedMovies(); // Fetching top-rated movies
          break;
        case 'now_playing':
          fetchedMovies = await fetchNowPlayingMovies(); // Fetching now-playing movies
          break;
        case 'upcoming':
          fetchedMovies = await fetchUpcomingMovies(); // Fetching upcoming movies
          break;
        default:
          fetchedMovies = await fetchPopularMovies(); // Fetching popular movies by default
          break;
      }

      // Limit the number of movies to 12
      const limitedMovies = fetchedMovies.slice(0, 12);
      
      setMovies(limitedMovies); // Updating movies state with fetched movies
    };

    fetchMoviesData(); // Calling fetchMoviesData function
  }, [selectedCategory]); // Dependency array with selectedCategory, so useEffect runs when selectedCategory changes

  // Event handler for category select change
  const handleCategoryChange = (event) => {
    const newCategory = event.target.value; // Getting new category from select input
    dispatch(setSelectedCategory(newCategory)); // Dispatching action to set selected category
    setMessage(''); // Clearing message
  };

  // Function to handle adding or removing a movie from favorites/watchlist
  const handleListAction = (title, isAdding, listName) => {
    if (isAdding) {
      setMessage(`'${title}' added to ${listName}`);
    } else {
      setMessage(`'${title}' removed from ${listName}`);
    }
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };

  return (
    <div id="page-home"> {/* Container for the home page */}
      <div id="category-select-form"> {/* Form for selecting movie category */}
        <label htmlFor="categorySelect">
          Display
          <select id="categorySelect" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="popular">Popular</option>
            <option value="top_rated">Top Rated</option>
            <option value="now_playing">Now Playing</option>
            <option value="upcoming">Upcoming</option>
          </select>
          movies:
        </label>
        <div id="message">
          {message && <span>{message}</span>}
        </div>
      </div>
      <div className="line"></div> {/* Horizontal line separator */}
      <MovieList movies={movies} handleListAction={handleListAction}/> {/* Rendering MovieList component with fetched movies */}
      <div className="line"></div> {/* Horizontal line separator */}
    </div>
  );
}

// Export the PageHome component
export default PageHome;
