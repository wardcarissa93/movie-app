import { useState, useEffect } from "react";
import "../styles/HeaderNav.scss";

const HeaderNav = () => {
  // State for handling the menu open/close status
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // State variables for header scroll behavior
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Handle scroll behavior to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      // Update scroll state based on scroll position
      setIsScrolled(window.scrollY > 50);
      setIsHidden(window.scrollY > 150);
    };
    // Listen for scroll events
    window.addEventListener("scroll", handleScroll);
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to run only once

  // Handle window resize to auto-close the menu on larger screens
  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen && window.innerWidth >= 1024) {
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
      className={`${isMenuOpen ? "expanded" : ""}${
        isScrolled ? " with-border" : ""
      }${isHidden ? " hidden" : ""}`}
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
      <a className={`logo ${isMenuOpen ? "hide" : ""}`} href="#0">
        <img src="images/logo.svg" alt="site-logo"></img>
      </a>
      <nav id="main-navigation" className={isMenuOpen ? "show" : ""}>
        <ul>
          {/* Navigation links */}
          <li className="main-navigation-li">
            <a className="main-navigation-a" href="#0">
              Favorites
            </a>
          </li>
          <li className="main-navigation-li">
            <a className="main-navigation-a" href="#0">
              Watch List
            </a>
          </li>
          <li className="main-navigation-li">
            <a className="main-navigation-a" href="#0">
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNav;
