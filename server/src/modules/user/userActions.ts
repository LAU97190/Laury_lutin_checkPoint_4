import { profile } from "node:console";
import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res) => {
  const users = await userRepository.readAll();

  res.json(users);
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const parseId = Number.parseInt(req.params.id);
    const user = await userRepository.read(parseId);

    if (user != null) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
      profile_pic: req.body.profile_pic,
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

export default { browse, read, add };
