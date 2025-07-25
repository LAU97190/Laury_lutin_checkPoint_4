import {
  A11y,
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "../Carousel/carousel.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DefaultImage from "../../assets/images/tabata.png";

type Carousel = {
  id: number;
  exercice: string;
  pics: string;
  user_id: number;
  lastname: string;
  profile_pic: string;
};

function Carousel() {
  const [exercices, setExercices] = useState<Carousel[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getExercices = useCallback(async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/exercices/`);
      if (res.ok) {
        const data = await res.json();
        setExercices(data);
      } else {
        setError("Erreur lors du chargement");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur de connexion");
    }
  }, []);

  useEffect(() => {
    getExercices();
  }, [getExercices]);

  return (
    <>
      <section className="carouselBloc">
        <h1 className="themetitle">NOS COURS</h1>

        {error && <p className="error-message">{error}</p>}

        <Swiper
          className="swiperBloc"
          modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            768: { slidesPerView: 2, spaceBetween: 20 },
            992: { slidesPerView: 3, spaceBetween: 20 },
          }}
          navigation={true}
        >
          {exercices.length === 0 ? (
            <p>Aucune donnée à afficher.</p>
          ) : (
            exercices.map((carousel) => (
              <SwiperSlide key={carousel.id} className="exercicesItem">
                <div className="swiperContent">
                  <div className="idExercice">
                    <img
                      className="ExercisePic"
                      src={DefaultImage}
                      alt="Photo titre"
                      loading="lazy"
                    />
                  </div>
                  <Link
                    to={`/list-class/${carousel.id}`}
                    className="exercice-link"
                  >
                    <span>Voir l'exercice →</span>
                  </Link>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </section>
    </>
  );
}

export default Carousel;
