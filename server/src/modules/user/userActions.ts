import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
    };

    const insertId = await userRepository.create(newUser);
    res.status(201).json({ insertId });
  } catch (err) {
    const error = err as { code?: string };

    if (error.code === "ER_DUP_ENTRY") {
      res.status(409).json({ message: "Cet email est déjà utilisé." });
    } else {
      res.status(500).json({ message: "Erreur interne" });
    }
  }
};

export default { add };
