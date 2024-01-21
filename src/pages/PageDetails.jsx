import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MovieDetails from '../components/MovieDetails';
import { fetchMovieDetails } from '../api/movieApi';

function MoviePage() {
  // Fetch movie details using movie ID from URL params
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
        const details = await fetchMovieDetails(id);
        setMovieDetails(details);
    };

    fetchDetails();
  }, [id]);

  return (
    <div>
      <h2>Movie Details Page</h2>
      {movieDetails ? <MovieDetails movie={movieDetails} /> : <p>Loading...</p>}
    </div>
  );
}

export default MoviePage;
