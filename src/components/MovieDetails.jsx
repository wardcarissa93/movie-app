import PropTypes from 'prop-types';

function MovieDetails({ movie }) {
  const { title, overview, release_date, vote_average } = movie;

  return (
    <div>
      <h3>{title}</h3>
      <p>Release Date: {release_date}</p>
      <p>Rating: {vote_average}</p>
      <p>{overview}</p>
    </div>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    // Add other necessary properties
  }).isRequired,
};

export default MovieDetails;
