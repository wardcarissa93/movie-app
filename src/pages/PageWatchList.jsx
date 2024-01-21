import { useEffect, useState } from 'react';
import MovieList from '../components/MovieList';

function WatchListPage() {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Retrieve movies from watch list in local storage
    const watchlistIds = JSON.parse(localStorage.getItem('watchlist')) || [];
    // Fetch detailed movie information using the movie IDs (You may need an API call here)
    // For simplicity, we'll just use dummy data
    const watchlistMovies = watchlistIds.map(id => ({
      id,
      title: `Movie ${id}`,
      releaseDate: '2022-01-01',
      rating: 75,
      posterUrl: 'https://example.com/poster.jpg',
    }));
    setWatchlist(watchlistMovies);
  }, []);

  return (
    <div>
      <h2>Watch List Page</h2>
      <MovieList movies={watchlist} />
    </div>
  );
}

export default WatchListPage;
