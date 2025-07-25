import "./HomePage.css";
import Carousel from "../../components/Carousel/carousel";

function HomePage() {
  return (
    <div className="HomePageContainer">
      <h1 className="TitleHomePage">Bienvenue</h1>
      <p className="textHomePage1">
        Notre équipe propose des cours de renforcement musculaire, cardio ou les
        deux combinés dans un environnement sûr et chaleureux. K-Style Training
        propose des cours à destination des débutants et des adeptes confirmés,
        ainsi que des séances spéciales limitées.
      </p>
      <Carousel />
    </div>
  );
}

export default HomePage;
