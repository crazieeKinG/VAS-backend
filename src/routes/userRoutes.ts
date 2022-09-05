import { Router } from "express";

import * as userController from "../controllers/userController";
import upload from "../filehandling/multer";
import authenticate from "../middlewares/authenticate";

const router = Router();

router.post("/", upload.single("photo"), userController.createUser);
router.get("/", authenticate, userController.getAllUsers);
router.get("/:userId", authenticate, userController.getUser);
router.put(
    "/:userId",
    authenticate,
    upload.single("photo"),
    userController.updateUser
);
router.delete("/:userId", authenticate, userController.deleteUser);

export default router;
