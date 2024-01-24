import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import { 
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies
} from '../api/movieApi';

function PageHome() {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState('popular'); // Default category is popular

  useEffect(() => {
    const fetchMoviesData = async () => {
      let fetchedMovies = [];
      switch (category) {
        case 'top_rated':
          fetchedMovies = await fetchTopRatedMovies();
          break;
        case 'now_playing':
          fetchedMovies = await fetchNowPlayingMovies();
          break;
        case 'upcoming':
          fetchedMovies = await fetchUpcomingMovies();
          break;
        default:
          fetchedMovies = await fetchPopularMovies();
          break;
      }

      // Limit the number of movies to 12
      const limitedMovies = fetchedMovies.slice(0, 12);
      
      setMovies(limitedMovies);
    };

    fetchMoviesData();
  }, [category]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div id="page-home">
      <div id="category-select-form">
        <label htmlFor="categorySelect">
          Display
          <select id="categorySelect" value={category} onChange={handleCategoryChange}>
            <option value="popular">Popular</option>
            <option value="top_rated">Top Rated</option>
            <option value="now_playing">Now Playing</option>
            <option value="upcoming">Upcoming</option>
          </select>
          movies:
        </label>
      </div>
      <div className="line"></div>
      <MovieList movies={movies} />
      <div className="line"></div>
    </div>
  );
}

export default PageHome;
