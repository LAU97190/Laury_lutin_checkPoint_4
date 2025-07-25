import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

import homeIcon from "../../assets/images/Icons/home.svg";
import logoImg from "../../assets/images/Icons/logo.jpg";
import profileIcon from "../../assets/images/Icons/profile.png";
import shopIcon from "../../assets/images/Icons/shop.png";
import facebookIcon from "../../assets/images/Social-network/facebook.png";
import gmailIcon from "../../assets/images/Social-network/gmail.png";
import instagramIcon from "../../assets/images/Social-network/instagram.png";

function NavBar() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="navbar" aria-label="Navigation principale">
        {isMobileView ? (
          <div className="logo-mobile">
            <img src={logoImg} alt="Logo" className="logo" />
          </div>
        ) : (
          <div className="navbar-desktop">
            {/* Réseaux sociaux à gauche */}
            <div className="socialNetwork">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="iconSocialNetwork"
                  src={facebookIcon}
                  alt="Facebook"
                />
              </a>
              <a href="mailto:contact@exemple.com">
                <img
                  className="iconSocialNetwork"
                  src={gmailIcon}
                  alt="Gmail"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="iconSocialNetwork"
                  src={instagramIcon}
                  alt="Instagram"
                />
              </a>
            </div>

            {/* Logo centré */}
            <div className="logo-desktop">
              <img src={logoImg} alt="Logo" className="logo" />
            </div>

            {/* Nav à droite */}
            <ul className="navbar-links">
              <li>
                <Link to="/" className="nav-link">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/list-class" className="nav-link">
                  Cours
                </Link>
              </li>
              <li>
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/profile" className="nav-link">
                  Mon compte
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Nav mobile fixe en bas */}
      {isMobileView && (
        <div className="navbar-mobile">
          <Link to="/class" className="icon-link">
            <img className="icon" src={shopIcon} alt="Exercice" />
          </Link>
          <Link to="/" className="icon-link">
            <img className="icon" src={homeIcon} alt="Accueil" />
          </Link>
          <Link to="/login" className="icon-link">
            <img className="icon" src={profileIcon} alt="Profil" />
          </Link>
        </div>
      )}
    </>
  );
}

export default NavBar;
