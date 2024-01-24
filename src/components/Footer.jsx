import packageJson from '../../package.json';

import '../styles/Footer.scss';

function Footer () {
    const currentYear = new Date().getFullYear();
    const contributors = packageJson.contributors || [];
    const contributorNames = contributors.join(' & ');
    
    return (
        <footer>
            <p>&copy; {currentYear} - Developed by {contributorNames}</p>
            <a href="https://github.com/wardcarissa93/movie-app" target="_blank" rel="noreferrer">
                View the code<img src="../../public/images/GitHub-logo.png" id="footer-github-icon" alt="Footer github icon"/>
            </a>
        </footer>
    )
}

export default Footer;