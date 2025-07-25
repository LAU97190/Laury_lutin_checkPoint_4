import type { Request, RequestHandler } from "express";
import jwt from "jsonwebtoken";

// Définir un type pour 'user' (adapte-le selon les données dans ton token)
interface User {
  id: string;
  email: string;
  role: string;
  // Ajoute d'autres propriétés si nécessaires
}

// Définir l'interface AuthRequest avec un user de type User
interface AuthRequest extends Request {
  user?: User;
}

const verifyToken: RequestHandler = (req, res, next): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token manquant ou invalide" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.APP_SECRET;

  if (!secret) {
    console.error("APP_SECRET non défini !");
    res.sendStatus(500);
    return;
  }

  try {
    // Vérifier le token et le décoder
    const decoded = jwt.verify(token, secret) as User; // Typage explicite ici
    (req as AuthRequest).user = decoded; // Stocke le user dans la requête
    next(); // Continue la chaîne
  } catch (err) {
    console.error("Token invalide :", err);
    res.status(401).json({ message: "Token invalide" });
  }
};

export default verifyToken;
