import databaseClient, {
  type Rows,
  type Result,
} from "../../../database/client";

type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  hashed_password: string;
  profile_pic: string;
};

type UserUpdate = {
  firstname: string;
  lastname: string;
  email: string;
  profile_pic: string;
};

class UserRepository {
  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO user (firstname, lastname, email, password) VALUES (?, ?, ?, ?)",
      [user.firstname, user.lastname, user.email, user.hashed_password],
    );

    return result.insertId;
  }

  async read(id: number): Promise<User | null> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, firstname, lastname, email, profile_pic FROM user WHERE id = ?",
      [id],
    );
    const user = rows[0] as User | undefined;
    return user ?? null;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM user");
    return rows as User[];
  }

  async readById(id: number): Promise<User | null> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, firstname, lastname, email, profile_picFROM user WHERE id = ?",
      [id],
    );

    const user = rows[0] as User | undefined;
    return user ?? null;
  }

  async readByEmailWithPassword(email: string): Promise<User | null> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, firstname, lastname, email, profile_pic, password AS hashed_password FROM user WHERE email = ?",
      [email],
    );

    const user = rows[0] as User | undefined;
    return user ?? null;
  }

  // Met a jour les information de l'utilisateur
  async update(id: number, data: UserUpdate) {
    const { firstname, lastname, email, profile_pic } = data;

    await databaseClient.query(
      "UPDATE user SET firstname = ?, lastname = ?, email = ?, profile_pic = ? WHERE id = ?",
      [firstname, lastname, email, profile_pic, id],
    );
  }
}

export default new UserRepository();
