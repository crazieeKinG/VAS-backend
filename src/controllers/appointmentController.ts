import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../domain/AuthorizedRequest";
import CustomError from "../misc/CustomError";
import logger from "../misc/logger";
import * as appointmentService from "../services/appointmentService";

export const getAllAppointments = (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    appointmentService
        .getAllAppointments()
        .then((data) => res.json(data))
        .catch((err) => next(err));
};

export const getAllAppointmentsByUser = (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const userId = req.currentUser as number;

    appointmentService
        .getAllAppointmentsByUser(+userId)
        .then((data) => res.json(data))
        .catch((err) => next(err));
};

export const getAppointment = (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const { appointmentId } = req.params;

    appointmentService
        .getAppointment(+appointmentId)
        .then((data) => res.json(data))
        .catch((err) => next(err));
};

export const createAppointment = (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const data = req.body;

    appointmentService
        .createAppointment(data)
        .then((data) => res.json(data))
        .catch((err) => next(err));
};

export const updateAppointment = (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const { appointmentId } = req.params;
    const data = req.body;

    if (!appointmentId || !data) {
        logger.error("Missing parameters appointmentId or data");
        throw new CustomError(
            "AppointmentId and updated data are required",
            StatusCodes.BAD_REQUEST
        );
    }

    appointmentService
        .updateAppointment({ ...data, id: +appointmentId })
        .then((data) => res.json(data))
        .catch((err) => next(err));
};

export const deleteAppointment = (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const { appointmentId } = req.params;

    appointmentService
        .deleteAppointment(+appointmentId)
        .then((data) => res.json(data))
        .catch((err) => next(err));
};
