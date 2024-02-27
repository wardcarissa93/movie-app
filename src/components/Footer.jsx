// Import package.json from the parent directory
import packageJson from '../../package.json';

// Import SCSS styles for the Footer component
import '../styles/Footer.scss';


// Footer component definition
function Footer () {
    // Getting the current year
    const currentYear = new Date().getFullYear();

    // Extracting contributors from package.json, defaulting to an empty array if not present
    const contributors = packageJson.contributors || [];

    // Joining contributor names with " & " separator
    const contributorNames = contributors.join(' & ');
    
    // Footer component JSX
    return (
        <footer>
            {/* Displaying the copyright year and contributor names */}
            <p>&copy; {currentYear} - Developed by {contributorNames}</p>

            {/* Link to the GitHub repository */}
            <a href="https://github.com/wardcarissa93/movie-app" target="_blank" rel="noreferrer">
                View the code{/* GitHub logo */}
                <img src="images/GitHub-logo.png" id="footer-github-icon" alt="Footer github icon"/>
            </a>
        </footer>
    )
}

// Export Footer component
export default Footer;