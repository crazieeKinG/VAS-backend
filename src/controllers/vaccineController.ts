import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../domain/AuthorizedRequest";
import CustomError from "../misc/CustomError";
import logger from "../misc/logger";
import * as vaccineService from "../services/vaccineService";

export const getAllVaccines = (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    vaccineService
        .getAllVaccines()
        .then((data) => res.json(data))
        .catch((err) => next(err));
};

export const getVaccine = (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const { vaccineId } = req.params;

    vaccineService
        .getVaccine(+vaccineId)
        .then((data) => res.json(data))
        .catch((err) => next(err));
};

export const createVaccine = (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const data = req.body;

    vaccineService
        .createVaccine(data)
        .then((data) => res.json(data))
        .catch((err) => next(err));
};

export const updateVaccine = (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const { vaccineId } = req.params;
    const data = req.body;

    if (!vaccineId || !data) {
        logger.error("Missing parameters vaccineId or data");
        throw new CustomError(
            "VaccineId and updated data are required",
            StatusCodes.BAD_REQUEST
        );
    }

    vaccineService
        .updateVaccine({ ...data, id: +vaccineId })
        .then((data) => res.json(data))
        .catch((err) => next(err));
};

export const deleteVaccine = (
    req: AuthorizedRequest,
    res: Response,
    next: NextFunction
) => {
    const { vaccineId } = req.params;

    vaccineService
        .deleteVaccine(+vaccineId)
        .then((data) => res.json(data))
        .catch((err) => next(err));
};
