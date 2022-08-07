import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import logger from "../misc/logger";
import CustomError from "../misc/CustomError";
import * as userService from "../services/userService";

export const login = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    userService
        .login(email, password)
        .then((data) => res.json(data))
        .catch((err) => next(err));
};

export const getAllUsers = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    userService
        .getAllUsers()
        .then((data) => res.json(data))
        .catch((err) => next(err));
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    userService
        .getUser(+userId)
        .then((data) => res.json(data))
        .catch((err) => next(err));
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;

    console.log(data);
    

    userService
        .createUser(data)
        .then((data) => res.json(data))
        .catch((err) => next(err));
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const data = req.body;

    if (!userId || !data) {
        logger.error("Missing parameters userId or data");
        throw new CustomError(
            "UserId and updated data are required",
            StatusCodes.BAD_REQUEST
        );
    }

    userService
        .updateUser({ ...data, id: +userId })
        .then((data) => res.json(data))
        .catch((err) => next(err));
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    userService
        .deleteUser(+userId)
        .then((data) => res.json(data))
        .catch((err) => next(err));
};
