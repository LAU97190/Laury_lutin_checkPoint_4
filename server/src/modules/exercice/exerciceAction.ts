import type { RequestHandler } from "express";
import exerciceRepository from "./exerciceRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const { exercice, user_id } = req.body;
    const pics = req.file?.filename;

    if (!exercice || !user_id || !pics) {
      res.status(400).json({ error: "Données manquantes" });
      return;
    }

    const insertId = await exerciceRepository.create({
      exercice,
      pics,
      user_id: Number(user_id),
    });

    res.status(201).json({ id: insertId });
  } catch (err) {
    console.error("Erreur création exercice :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export default { add };
