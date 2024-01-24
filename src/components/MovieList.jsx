import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import "../styles/MovieList.scss";

function MovieList({ movies }) {
    return (
        <div id="movie-list">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}

MovieList.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
           id: PropTypes.number.isRequired
        })
    ).isRequired
};

export default MovieList;