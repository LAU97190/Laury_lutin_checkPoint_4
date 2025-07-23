import { useEffect, useState } from "react"; // On prend des outils de React
import { Link } from "react-router-dom"; // Pour les liens internes (comme <a>)
import "./logo.css";
function Logo() {
  // On crée une "boîte" (état) qui dit si l'écran est large (au début on vérifie la taille actuelle)
  const [isMaxView, setIsMaxView] = useState(window.innerWidth >= 1024);

  // Quand le composant s'affiche (et à chaque redimensionnement), on vérifie la taille
  useEffect(() => {
    const handleResize = () => {
      setIsMaxView(window.innerWidth >= 1024); // si écran >= 1024px, on dit "oui c'est un grand écran"
    };

    window.addEventListener("resize", handleResize); // on écoute les changements
    return () => window.removeEventListener("resize", handleResize); // on nettoie à la fin
  }, []);

  // Si l'écran est grand
  if (isMaxView) {
    return (
      <div className="imgContainer">
        <div className="socialNetwork">
          <Link to="">
            <img
              className="iconSociaNetwork"
              src="./src/assets/images/Social-network/facebook.png"
              alt="Facebook"
            />
          </Link>
          <Link to="">
            <img
              className="iconSociaNetwork"
              src="./src/assets/images/Social-network/gmail.png"
              alt="Gmail"
            />
          </Link>
          <Link to="">
            <img
              className="iconSociaNetwork"
              src="./src/assets/images/Social-network/instagram.png"
              alt=""
            />
          </Link>
          <Link to="">
            <img
              className="iconSociaNetwork"
              src="./src/assets/images/Social-network/mobile.png"
              alt=""
            />
          </Link>
          <Link to="">
            <img
              className="iconSociaNetwork"
              src="./src/assets/images/Social-network/tic-tac.png"
              alt=""
            />
          </Link>
          <Link to="">
            <img
              className="iconSociaNetwork"
              src="./src/assets/images/Social-network/whatsapp.png"
              alt=""
            />
          </Link>
          <Link to="">
            <img
              className="iconSociaNetwork"
              src="./src/assets/images/Social-network/youtube.png"
              alt=""
            />
          </Link>
        </div>
        <div className="logoContainer">
          <img
            className="logo"
            src="./src/assets/images/Icons/logo.jpg"
            alt="Logo"
          />
        </div>
      </div>
    );
  }

  // Sinon (petit écran), on montre juste le logo
  return (
    <div className="logoContainer">
      <img
        className="logo"
        src="./src/assets/images/Icons/logo.jpg"
        alt="Logo"
      />
    </div>
  );
}

export default Logo;
