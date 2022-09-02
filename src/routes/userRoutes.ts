import { Router } from "express";

import * as userController from "../controllers/userController";
import upload from "../filehandling/multer";
import authenticate from "../middlewares/authenticate";

const router = Router();

router.get("/", authenticate, userController.getAllUsers);
router.get("/:userId", authenticate, userController.getUser);
router.put(
    "/:userId",
    authenticate,
    upload.single("photo"),
    userController.updateUser
);
router.delete("/:userId", authenticate, userController.deleteUser);

router.post("/", upload.single("photo"), userController.createUser);

export default router;
