import express from "express";
import multer from "multer";

const app = express();

// Où enregistrer les fichiers uploadés (ex : dossier "uploads")
const upload = multer({ dest: "uploads/" });

// Route POST avec upload d’une seule image, champ "pics"
app.post("/api/exercices", upload.single("pics"), (req, res) => {
  console.log("Fichier uploadé :", req.file); // infos du fichier
  console.log("Champs texte :", req.body); // autres champs du formulaire

  res.json({ message: "Upload réussi" });
});
