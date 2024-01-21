import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

function MovieList({ movies }) {
    return (
        <div>
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
    ).isRequired,
};

export default MovieList;