// Import the PropTypes library for type-checking
import PropTypes from 'prop-types';

// Import the MovieCard component
import MovieCard from './MovieCard';

// Import the SCSS file for styling
import '../styles/MovieList.scss';


// MovieList component definition
function MovieList({ movies, addToFavorites }) {
    // Rendering the list of movies using MovieCard component
    return (
        <div id="movie-list">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} addToFavorites={addToFavorites}/>
            ))}
        </div>
    );
}

// PropTypes validation for the 'movies' prop
MovieList.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired // 'id' is required and must be a number
        })
    ).isRequired,
    addToFavorites: PropTypes.func.isRequired // 'addToFavorites' function is required
};

// Export the MovieList component
export default MovieList;