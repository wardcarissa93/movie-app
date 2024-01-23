import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../styles/HeaderNav.scss";

const HeaderNav = () => {
  // State for handling the menu open/close status
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle window resize to auto-close the menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen && window.innerWidth >= 960) {
        setIsMenuOpen(false);
      }
    };
    // Listen for resize events
    window.addEventListener("resize", handleResize);
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  // Effect for toggling 'no-scroll' class on body when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Cleanup to remove class when component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMenuOpen]);
  // Function to toggle the menu open/close state
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      // Apply dynamic classes based on state
      className={`${isMenuOpen ? "expanded" : ""}`}
    >
      <button
        // Hamburger menu button toggle
        className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span className="hamburger-menu-content" tabIndex="-1">
          <span className="sr-only">Menu</span>
          <span className="bar" id="bar1"></span>
          <span className="bar" id="bar2"></span>
          <span className="bar" id="bar3"></span>
        </span>
        {/* end hamburger-menu-content */}
      </button>
      <Link className={`logo ${isMenuOpen ? "hide" : ""}`} to={'/'}>
        <img src="images/logo.svg" alt="site-logo"></img>
      </Link>
      <nav id="main-navigation" className={isMenuOpen ? "show" : ""}>
        <ul>
          {/* Navigation links */}
          <li className="main-navigation-li">
            <Link className="main-navigation-link" to={'/'}>Home</Link>
          </li>
          <li className="main-navigation-li">
            <Link className="main-navigation-link" to={'/about'}>About</Link>
          </li>
          <li className="main-navigation-li">
            <Link className="main-navigation-link" to={'/favorites'}>Favorites</Link>
          </li>
          <li className="main-navigation-li">
            <Link className="main-navigation-link" to={'/watchlist'}>Watch List</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNav;
