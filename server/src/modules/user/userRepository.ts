import databaseClient, { type Result } from "../../../database/client";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hashed_password: string;
};

class UserRepository {
  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)",
      [user.firstname, user.lastname, user.email, user.hashed_password],
    );

    return result.insertId;
  }
}

export default new UserRepository();
