import { Router } from "express";

import userRoutes from "./userRoutes";
import loginRouter from "./loginRoutes";

const router = Router();

router.use("/login", loginRouter);

router.use("/users", userRoutes);

export default router;
