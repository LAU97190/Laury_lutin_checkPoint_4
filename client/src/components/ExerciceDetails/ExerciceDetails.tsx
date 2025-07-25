import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type Exercise = {
  id: number;
  exercice: string;
  pics: string;
  user_id: number;
  lastname: string;
  profile_pic: string;
  description?: string; // par exemple
};

function ExerciseDetail() {
  const { id } = useParams<{ id: string }>();
  const [exercise, setExercise] = useState<Exercise | null>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${import.meta.env.VITE_API_URL}/api/exercices/${id}`)
      .then((res) => res.json())
      .then((data) => setExercise(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!exercise) return <p>Chargement...</p>;

  return (
    <div>
      <img src={exercise.pics} alt={exercise.exercice} />
      <p>{exercise.description}</p>
    </div>
  );
}

export default ExerciseDetail;
