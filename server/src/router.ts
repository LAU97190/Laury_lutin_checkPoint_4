import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import authAction from "./modules/auth/authAction";
import exerciceAction from "./modules/exercice/exerciceAction";
import exerciceRepository from "./modules/exercice/exerciceRepository";
// Define item-related routes
import itemActions from "./modules/item/itemActions";
import userActions from "./modules/user/userActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */
router.get("/api/users", userActions.browse);
router.get("/api/users/:id", userActions.read);
router.post("/api/login", authAction.login);
router.put("api/users/:id", userActions.edit);
router.post("/api/users", authAction.hashPassword, userActions.add);

import multer from "multer";
import authMiddleware from "./auth/authMiddleware";
import connectedMiddleware from "./middleware/connectedMiddleware";
/* ************************************************************************* */
import exerciceController from "./modules/exercice/exerciceAction";
const upload = multer({ dest: "uploads/" });

router.get("/api/exercices", exerciceAction.browse);
router.get("/api/exercices/:id", exerciceAction.read);
router.put("/api/exercices/:id", exerciceAction.edit);
router.post("/api/exercices", exerciceAction.add);
router.post("/api/exercice", upload.single("pics"), exerciceController.add);
router.delete("/api/exercices/:id", exerciceAction.destroy);

export default router;
