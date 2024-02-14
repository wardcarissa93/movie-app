import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import { fetchMovieDetails } from '../api/movieApi';
import { useSelector } from 'react-redux';
import '../styles/PageWatchList.scss';

function PageWatchList() {
  const watchList = useSelector((state) => state.user.watchlist);

  const [watchListMovies, setWatchListMovies] = useState([]);

  useEffect(() => {
    const fetchWatchListMovies = async () => {
      const watchListIds = JSON.parse(localStorage.getItem('watchlist')) || [];
      const watchListMovies = await Promise.all(watchListIds.map(fetchMovieDetails));
      setWatchListMovies(watchListMovies.filter(movie => movie && (watchList ?? []).includes(movie.id)));    
    };

    fetchWatchListMovies();
  }, [watchList]);

  return (
    <div className="page-watchlist-container">
      <h3>Your Watch List</h3>
      <div className="line"></div>
      {watchListMovies.length === 0 ? (
        <div className="empty-watchlist-container">
          <p>You haven&apos;t added any movies to your Watch List yet!</p>
          <div className="watchlist-instructions">
            Create your Watch List by clicking the
            <div className="plus-sign watchlist"></div>
            button by each movie.
          </div>
        </div>
      ) : (
        <MovieList movies={watchListMovies} hideUnfavorited={true} />
      )}
      <div className="line"></div>
    </div>
  );
}

export default PageWatchList;
