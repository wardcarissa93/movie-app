import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieList from '../components/MovieList';
import { 
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies
} from '../api/movieApi';
import { setSelectedCategory } from '../features/movies/moviesSlice';

function PageHome() {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const selectedCategory = useSelector(state => state.movies.selectedCategory);

  useEffect(() => {
    const fetchMoviesData = async () => {
      let fetchedMovies = [];
      switch (selectedCategory) {
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
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    dispatch(setSelectedCategory(newCategory));
  };

  return (
    <div id="page-home">
      <div id="category-select-form">
        <label htmlFor="categorySelect">
          Display
          <select id="categorySelect" value={selectedCategory} onChange={handleCategoryChange}>
            <option value="popular">Popular</option>
            <option value="top_rated">Top Rated</option>
            <option value="now_playing">Now Playing</option>
            <option value="upcoming">Upcoming</option>
          </select>
          movies:
        </label>
      </div>
      <div className="line"></div>
      <MovieList movies={movies} hideUnfavorited={false} />
      <div className="line"></div>
    </div>
  );
}

export default PageHome;
