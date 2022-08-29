import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

import logger from "../misc/logger";
import CustomError from "../misc/CustomError";
import * as userService from "../services/userService";
import uploadImage from "../filehandling/uploadImage";
import userModel from "../models/userModel";
import deleteImage from "../filehandling/deleteImage";
import { cloudinaryError } from "../utils/errors";
import fs from "fs";
import User from "../domain/User";

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

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const data = req.body;

    let cloudinaryUrl: string = "";

    if (!!req.file) {
        logger.info("Uploading contact image");
        const fileString = (<Express.Multer.File>req.file).path;
        cloudinaryUrl = await uploadImage(fileString);
    }

    userService
        .createUser({ ...data, documentUrl: cloudinaryUrl })
        .then((data) => res.json(data))
        .catch((err) => next(err));
};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.params;
    let data: User = req.body;

    if (!!req.file) {
        const previousUser = await userModel.getUser(+userId);
        logger.info("Deleting previous image");
        const response = await deleteImage(previousUser.documentUrl);

        const fileString = (<Express.Multer.File>req.file).path;
        if (response.toString() === "ok") {
            logger.info("Uploading document image");
            const cloudinaryUrl = await uploadImage(fileString);
            data = { ...data, documentUrl: cloudinaryUrl };
        } else {
            fs.unlinkSync(fileString);
            throw cloudinaryError;
        }
    }

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

export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { userId } = req.params;

    const previousUser = await userModel.getUser(+userId);
    logger.info("Deleting previous image");
    const response = await deleteImage(previousUser.documentUrl);

    if (response.toString() === "ok") {
        userService
            .deleteUser(+userId)
            .then((data) => res.json(data))
            .catch((err) => next(err));
    } else {
        throw cloudinaryError;
    }
};
