import { NextFunction, Request, Response } from "express";

import * as userService from "../services/userService";

/**
 * "Get the user's login credentials of provided userName"
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const getUserLoginCredentials = (req: Request, res: Response, next: NextFunction) => {
    const { userName } = req.params;

    userService
        .getUserLoginCredentials(userName)
        .then((data) => res.json(data))
        .catch((err) => next(err));
};
