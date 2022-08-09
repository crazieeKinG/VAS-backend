import { Router } from "express";

import userRoutes from "./userRoutes";
import loginRouter from "./loginRoutes";
import vaccineRouter from "./vaccineRoutes";
import appointmentRouter from "./appointmentRoutes";
import authenticate from "../middlewares/authenticate";

const router = Router();

router.use("/login", loginRouter);

router.use("/users", userRoutes);

router.use(authenticate);

router.use("/vaccines", vaccineRouter);

router.use("/appointments", appointmentRouter);

export default router;
