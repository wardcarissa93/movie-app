import { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import { 
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies
} from '../api/movieApi';

function Home() {
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
      setMovies(fetchedMovies);
    };

    fetchMoviesData();
  }, [category]);

  return (
    <div id="page-home">
      <div>
        <label>
          <input 
            type="radio"
            value="popular"
            checked={category === 'popular'}
            onChange={() => setCategory('popular')}
          />
          Popular
        </label>
        <label>
          <input 
            type="radio" 
            value="top_rated"
            checked={category === 'top_rated'}
            onChange={() => setCategory('top_rated')}
          />
          Top Rated
        </label>
        <label>
          <input 
            type="radio"
            value="now_playing"
            checked={category === 'now_playing'}
            onChange={() => setCategory('now_playing')} 
          />
          Now Playing
        </label>
        <label>
          <input 
            type="radio" 
            value="upcoming"
            checked={category === 'upcoming'}
            onChange={() => setCategory('upcoming')}
          />
          Upcoming
        </label>
      </div>
      <MovieList movies={movies} />
    </div>
  );
}

export default Home;
