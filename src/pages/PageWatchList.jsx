import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';
import { fetchMovieDetails } from '../api/movieApi';
import '../styles/PageWatchList.scss';

function PageWatchList() {
  const [watchlist, setWatchList] = useState([]);

  useEffect(() => {
    const fetchWatchList = async () => {
      const watchlistIds = JSON.parse(localStorage.getItem('watchlist')) || [];
      const watchlistMovies = await Promise.all(watchlistIds.map(fetchMovieDetails));
      setWatchList(watchlistMovies.filter(movie => movie)); // Filter out null values
    };

    fetchWatchList();
  }, []);

  return (
    <div className="page-watchlist-container">
      <h3>Your Watch List</h3>
      <div className="line"></div>
      {watchlist.length === 0 ? (
        <div className="empty-watchlist-container">
          <p>You have not added any movies to your Watch List yet!</p>
          <div className="watchlist-instructions"> 
            Create your Watch List by clicking the
            <div className="plus-sign watchlist"></div>
            button by each movie.
          </div>
        </div>
      ) : (
        <MovieList movies={watchlist} />
      )}
      <div className="line"></div>
    </div>
  );
}

export default PageWatchList;

