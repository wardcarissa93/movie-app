import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import "../styles/MovieDetails.scss";

function MovieDetails({ movie }) {
  let { title, overview, poster_path, release_date, vote_average } = movie;

  return (
    <div id="details-wrapper">
      <h3>Details for <i>{title}</i></h3>
      <div id="movie-details">
        <div>
          <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
        </div>
        <div>
          <p>{overview}</p>
          <div className="release-rating"></div>
          <p>Release Date: {dateFormat(release_date, "mmm dS, yyyy")}</p>
          <p>Rating: {vote_average}</p>
        </div>
      </div>
    </div>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    overview: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    // Add other necessary properties
  }).isRequired,
};

export default MovieDetails;
