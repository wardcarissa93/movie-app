// Import the SCSS file for styling
import "../styles/About.scss";


// About component definition
function About() {
  return (
    <div id="about-div">
      <div id="about-title-div">
        <h3 id="about-title">About</h3> {/* Heading for the About section */}
      </div>
      <div className="line"></div> {/* Horizontal line separator */}
      <div className="about-container">
        <section>
          <h3>About the Project</h3>
          <p>FilmFindr is a movie app created for educational use. It is a database where films are categorized by popularity, 
            rating, and release date. Explore to find your preferred movie, include it 
            in your Favorites, and store it for later viewing in the Watch List!
          </p>
          <p>☆ This product uses the <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer noopener" id="tmdb-link">TMDb API</a> but is not endorsed or certified by TMDb.</p>
          <div>
            <a href="https://www.themoviedb.org/" target="_blank" rel="noreferrer noopener">
              <img src="../../public/images/TMDb.png" alt="TMDb Logo"/>
            </a>
          </div>
        </section>
        <section>
          <h3>About the Team</h3>
          <p>FilmFindr is a React JS project proudly created by Carissa and Samaneh. 
            Our shared love for technology and innovation propels us to create and deliver 
            exceptional solutions in the world of web development.
          </p>
        </section>
      </div>
      <div className="line"></div> {/* Horizontal line separator */}
    </div>   
  );
}

// Export the About component
export default About;
