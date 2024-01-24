import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "../styles/HeaderNav.scss";

const HeaderNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (isMenuOpen && window.innerWidth >= 960) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`${isMenuOpen ? "expanded" : ""}`}
    >
      <button
        className={`hamburger-menu ${isMenuOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span className="hamburger-menu-content" tabIndex="-1">
          <span className="sr-only">Menu</span>
          <span className="bar" id="bar1"></span>
          <span className="bar" id="bar2"></span>
          <span className="bar" id="bar3"></span>
        </span>
      </button>
      <Link className={`logo ${isMenuOpen ? "hide" : ""}`} to={'/'} title="Return to Home">
        <img src="images/logo.svg" alt="site-logo"></img>
      </Link>
      <nav id="main-navigation" className={isMenuOpen ? "show" : ""}>
        <ul>
          <li className="main-navigation-li">
            <Link
              className="main-navigation-link"
              to={'/'}
              onClick={closeMenu}
            >
              Home
            </Link>
          </li>
          <li className="main-navigation-li">
            <Link
              className="main-navigation-link"
              to={'/about'}
              onClick={closeMenu}
            >
              About
            </Link>
          </li>
          <li className="main-navigation-li">
            <Link
              className="main-navigation-link"
              to={'/favorites'}
              onClick={closeMenu}
            >
              Favorites
            </Link>
          </li>
          <li className="main-navigation-li">
            <Link
              className="main-navigation-link"
              to={'/watchlist'}
              onClick={closeMenu}
            >
              Watch List
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNav;
