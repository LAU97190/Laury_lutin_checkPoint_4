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
router.post("/api/users", authAction.hashPassword, userActions.add);
router.post("/api/login", authAction.login);

import multer from "multer";
/* ************************************************************************* */
import exerciceController from "./modules/exercice/exerciceAction";
const upload = multer({ dest: "uploads/" });

router.post("/api/exercices", exerciceAction.add);
router.post("/api/exercice", upload.single("pics"), exerciceController.add);

export default router;
