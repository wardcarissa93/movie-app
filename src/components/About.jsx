// Import the SCSS file for styling
import "../styles/About.scss";

// About component definition
function About() {
  return (
    
    <div id = "aboutDiv">
      <h2>Welcome to Film Finder</h2>
      <div className="line"></div>

      <div className="about-container">
        <section>
          <h3>About the Project</h3>
          <p>Film Finder is a movie app created for educational use. It is a database where films are categorized by popularity, 
            rating, and release date. Explore to find your preferred movie, include it 
            in your Favorites, and store it for later viewing in the Watch Later list!
          </p>
          <p>☆ This product uses the <a href="https://www.themoviedb.org/" target="_blank">TMDb API</a> but is not endorsed or certified by TMDb.</p>
          <div>
            <a href="https://www.themoviedb.org/" target="_blank">
              <img src="images/TMDb.png" style={{ width: '170px' }} alt="TMDb Logo"/>
            </a>
          </div>
        </section>

        <section>
          <h3>About the Team</h3>
          <p>Film Finder is a React JS project proudly created by Carissa, and Samaneh. 
            Our shared love for technology and innovation propels us to create and deliver 
            exceptional solutions in the world of web development.
          </p>
        </section>
      </div>
      <div className="line"></div>

    </div>

    
  );
}

// Export the About component
export default About;
