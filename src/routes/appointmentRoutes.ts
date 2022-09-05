import { Router } from "express";

import * as appointmentController from "../controllers/appointmentController";
const router = Router();

router.get("/", appointmentController.getAllAppointments);
router.get("/user", appointmentController.getAllAppointmentsByUser);
router.get("/:appointmentId", appointmentController.getAppointment);
router.post("/", appointmentController.createAppointment);
router.put("/:appointmentId", appointmentController.updateAppointment);
router.delete("/:appointmentId", appointmentController.deleteAppointment);

export default router;
