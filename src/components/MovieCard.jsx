import { useState, useEffect } from 'react';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    addToFavorites,
    removeFromFavorites,
    addToWatchList,
    removeFromWatchList
} from '../features/user/userSlice';
import "../styles/MovieCard.scss";

function MovieCard({ movie, hideUnfavorited }) {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.user.favorites);
    const watchlist = useSelector((state) => state.user.watchlist);

    const [isFavorite, setIsFavorite] = useState(false);
    const [isInWatchList, setIsInWatchList] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        setIsFavorite(favorites.includes(movie.id));
        setIsInWatchList(watchlist.includes(movie.id));
    }, [favorites, watchlist, movie.id]);

    useEffect(() => {
        setIsHidden(hideUnfavorited && !isFavorite);
    }, [hideUnfavorited, isFavorite])

    const toggleFavorite = () => {
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
        setIsInWatchList(!isInWatchList);
    };

    // Convert the movie's rating to stars
    const generateStars = () => {
        const numberOfStars = Math.round(movie.vote_average);
        return Array.from({ length: numberOfStars }, (_unused, index) => (
            <div key={index} className="star"></div>
        ));
    };

    const getPosterPath = () => {
        // Check if poster_path is available, if not use the alternate image
        return movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '../../public/images/image-not-found.png'; 
    };

    const { id, overview, title, release_date } = movie;
    // console.log(movie);
0
    return (
        <div className={`movie-card ${isHidden ? 'hidden' : ''}`}>
            <img src={getPosterPath()} alt={title} />
            <div className='movie-data'>
                <h3 className="movie-title">{title}</h3>
                <p>{overview.substr(0, 65)}...</p>
                <button className="more-info-button" title="More Info">
                    <Link to={`/movie/${id}`}>More Info</Link>
                </button>
                <div className="release-rating">
                    <div className="release-rating-labels">
                        <p>Released:</p>
                        <p>Rating:</p>
                    </div>
                    <div className="release-rating-values">
                        <p>{dateFormat(release_date, "mmm dS, yyyy")}</p>
                        <div className="star-container">{generateStars()}</div>
                    </div>
                </div>
                <div className="favorite-watchlist">
                    <button onClick={toggleFavorite} title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}>
                        <div className={`heart ${isFavorite ? 'favorite' : ''}`}></div>
                    </button>
                    <button onClick={toggleWatchList} title={isInWatchList ? 'Remove from Watch List' : 'Add to Watch List'} className="plus-sign-button">
                        <div className={`plus-sign ${isInWatchList ? 'watchlist' : ''}`}></div>
                    </button>
                </div>
            </div>
        </div>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        overview: PropTypes.string.isRequired,
        poster_path: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        release_date: PropTypes.string.isRequired,
        vote_average: PropTypes.number.isRequired,
    }).isRequired,
    hideUnfavorited: PropTypes.bool.isRequired,
};

export default MovieCard;
