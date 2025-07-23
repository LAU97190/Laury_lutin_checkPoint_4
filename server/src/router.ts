import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import authAction from "./modules/auth/authAction";
// Define item-related routes
import itemActions from "./modules/item/itemActions";
import userActions from "./modules/user/userActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

/* ************************************************************************* */

router.post("/api/users", authAction.hashPassword, userActions.add);

export default router;
