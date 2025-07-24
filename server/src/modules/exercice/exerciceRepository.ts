import databaseClient, {
  type Rows,
  type Result,
} from "../../../database/client";

type Exercice = {
  id: number;
  exercice: string;
  pics: string;
  user_id: number;
};

class ExerciceRepository {
  async create(newExercice: {
    user_id: number;
    exercice: string;
    pics: string;
  }) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO exercice (exercice, pics, user_id) VALUES (?, ?, ?)",
      [newExercice.exercice, newExercice.pics, newExercice.user_id],
    );

    return result.insertId;
  }
}

export default new ExerciceRepository();
