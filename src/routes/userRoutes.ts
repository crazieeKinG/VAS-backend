import { Router } from "express";

import * as userController from "../controllers/userController";
import authenticate from "../middlewares/authenticate";

const router = Router();

router.get("/", authenticate, userController.getAllUsers);
router.get("/:userId", authenticate, userController.getUser);
router.put("/:userId", authenticate, userController.updateUser);
router.delete("/:userId", authenticate, userController.deleteUser);

router.post("/", userController.createUser);

export default router;
