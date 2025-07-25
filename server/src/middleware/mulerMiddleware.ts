import express from "express";
import multer from "multer";
import verifyToken from "../auth/authMiddleware";
import userRepository from "../modules/user/userRepository";

const app = express();

// Où enregistrer les fichiers uploadés (ex : dossier "uploads")
const upload = multer({ dest: "uploads/" });

// Route POST avec upload d’une seule image, champ "pics"
app.post("/api/exercices", upload.single("pics"), (req, res) => {
  console.log("Fichier uploadé :", req.file); // infos du fichier
  console.log("Champs texte :", req.body); // autres champs du formulaire

  res.json({ message: "Upload réussi" });
});

const router = express.Router();

router.put("/users/:id", verifyToken, async (req, res) => {
  const userId = Number(req.params.id);
  const { firstname, lastname, email, profile_pic } = req.body;

  try {
    await userRepository.update(userId, {
      firstname,
      lastname,
      email,
      profile_pic,
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});
