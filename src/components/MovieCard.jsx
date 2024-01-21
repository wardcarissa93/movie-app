import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
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
            localStorage.setItem('favorites', JSON.stringify([favorites, movie.id]));
        }
        setIsFavorite(!isFavorite);
    };

    const toggleWatchList = () => {
        // Toggle watchlist status and update local storage
        const watchList = JSON.parse(localStorage.getItem('watchList')) || [];
        if (isInWatchList) {
            const updatedWatchList = watchList.filter(id => id !== movie.id);
            localStorage.setItem('watchList', JSON.stringify(updatedWatchList));
        } else {
            localStorage.setItem('watchList'), JSON.stringify([...watchList, movie.id]);
        }
        setIsInWatchList(!isInWatchList);
    };

    const { id, poster_path, title, release_date, vote_average } = movie;

    return (
        <div>
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
            <h3>{title}</h3>
            <p>Release Date: {release_date}</p>
            <p>Rating: {vote_average}</p>
            <button onClick={toggleFavorite}>
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <button onClick={toggleWatchList}>
                {isInWatchList ? 'Remove from Watch List' : 'Add to Watch List'}
            </button>
            <Link to={`/movie/${id}`}>More Info</Link>
        </div>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        poster_path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        release_date: PropTypes.string.isRequired,
        vote_average: PropTypes.number.isRequired,
    }).isRequired,
};

export default MovieCard;
