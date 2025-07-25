import type { RequestHandler } from "express";
import exerciceRepository from "./exerciceRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const exerciceFromDB = await exerciceRepository.readAll();

    res.json(exerciceFromDB);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  const parseId = Number.parseInt(req.params.id);
  const exercice = await exerciceRepository.read(parseId);
  if (exercice != null) {
    res.json(exercice);
  } else {
    res.status(404);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const exercice = {
      id: Number(req.params.id),
      exercice: req.body.exercice,
      pics: req.file?.filename ?? "",
      user_id: req.body.user_id,
    };

    const affectedRows = await exerciceRepository.update(exercice);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  console.log("file", req.file);
  console.log("body", req.body);
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

const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Delete a specific category based on the provided ID
    const exerciceId = Number(req.params.id);

    await exerciceRepository.delete(exerciceId);

    // Respond with HTTP 204 (No Content) anyway
    res.sendStatus(204);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
