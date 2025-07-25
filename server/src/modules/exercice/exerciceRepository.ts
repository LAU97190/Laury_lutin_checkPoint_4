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

  async readAll() {
    const [rows] = await databaseClient.query(`
    SELECT 
      e.id, 
      e.exercice, 
      e.user_id, 
      e.pics,
      u.firstname,
      u.lastname,
      u.email
    FROM exercice AS e
    INNER JOIN user AS u ON e.user_id = u.id
  `);
    return rows as Exercice[];
  }

  async read(id: number) {
    const [rows] = await databaseClient.query(
      `
        SELECT 
          e.id, 
          e.exercice, 
          e.user_id, 
          e.pics,
          u.firstname,
          u.lastname,
          u.email
        FROM exercice AS e
        INNER JOIN user AS u ON e.user_id = u.id
        WHERE e.id = ?
      `,
      [id],
    );
    return (rows as Exercice[])[0] ?? null;
  }

  async update(exercice: Exercice) {
    const [result] = await databaseClient.query<Result>(
      `UPDATE exercice 
       SET exercice = ?, pics = ?, user_id = ?
       WHERE id = ?`,
      [exercice.exercice, exercice.pics, exercice.user_id, exercice.id],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from exercice where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new ExerciceRepository();
