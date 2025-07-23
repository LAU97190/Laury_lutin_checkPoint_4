import { Link } from "react-router-dom";
import "../NavBar/NavBar.css";
import { useEffect, useState } from "react";
function NavBar() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="">
      <ul className="NavBarContainer">
        <Link to="/" className="titleNav">
          Acceuil
        </Link>
        <Link to="/" className="titleNav">
          A propos
        </Link>
        <Link to="/" className="titleNav">
          Cours
        </Link>
        <Link to="/" className="titleNav">
          Contactez-nous
        </Link>
      </ul>

      {isMobileView && (
        <div className="navBarMobile">
          <Link to="/" className="icon-link">
            <img
              className="icon"
              src="./src/assets/images/Icons/shop.png"
              alt="Touche boutique"
            />
          </Link>
          <Link to="/HomePage" className="icon-link">
            <img
              className="iconLogo"
              src="./src/assets/images/Icons/home.svg"
              alt="Touche page d'accueil"
            />
          </Link>

          <Link to="/Profile" className="icon-link">
            <img
              className="icon"
              src="./src/assets/images/Icons/profile.png"
              alt="Touche profile"
            />
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;
