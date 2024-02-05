import PropTypes from 'prop-types';
import MovieCard from './MovieCard';
import "../styles/MovieList.scss";

function MovieList({ movies, hideUnfavorited }) {
    return (
        <div id="movie-list">
            {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} hideUnfavorited={hideUnfavorited} />
            ))}
        </div>
    );
}

MovieList.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
           id: PropTypes.number.isRequired
        })
    ).isRequired,
    hideUnfavorited: PropTypes.bool.isRequired,
};

export default MovieList;