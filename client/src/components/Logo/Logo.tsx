import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import facebookIcon from "../../assets/images/Social-network/facebook.png";
import gmailIcon from "../../assets/images/Social-network/gmail.png";
import instagramIcon from "../../assets/images/Social-network/instagram.png";
import mobileIcon from "../../assets/images/Social-network/mobile.png";
import ticTacIcon from "../../assets/images/Social-network/tic-tac.png";
import whatsappIcon from "../../assets/images/Social-network/whatsapp.png";
import youtubeIcon from "../../assets/images/Social-network/youtube.png";

import logoImg from "../../assets/images/Icons/logo.jpg";

import "./logo.css";

function Logo() {
  const [isMaxView, setIsMaxView] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsMaxView(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMaxView) {
    return (
      <div className="imgContainer">
        <div className="socialNetwork">
          {[
            { icon: facebookIcon, alt: "Facebook", to: "" },
            { icon: gmailIcon, alt: "Gmail", to: "" },
            { icon: instagramIcon, alt: "Instagram", to: "" },
            { icon: mobileIcon, alt: "Mobile", to: "" },
            { icon: ticTacIcon, alt: "TikTok", to: "" },
            { icon: whatsappIcon, alt: "WhatsApp", to: "" },
            { icon: youtubeIcon, alt: "YouTube", to: "" },
          ].map(({ icon, alt, to }) => (
            <Link key={alt} to={to}>
              <img className="iconSociaNetwork" src={icon} alt={alt} />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="logoContainer">
      <img className="logo" src={logoImg} alt="Logo" />
    </div>
  );
}

export default Logo;
