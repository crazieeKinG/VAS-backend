import logger from "../misc/logger";
import Success from "../domain/Success";
import userModel from "../models/userModel";
import User, { UserToInsert } from "../domain/User";
import bcrypt from "bcrypt";

import Token from "../domain/Token";

import jwt from "jsonwebtoken";
import CustomError from "../misc/CustomError";
import { StatusCodes } from "http-status-codes";

export const login = async (
    email: string,
    password: string
): Promise<Success<Token>> => {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
        throw new CustomError(
            "Invalid email or password",
            StatusCodes.UNAUTHORIZED
        );
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new CustomError(
            "Password does not match",
            StatusCodes.UNAUTHORIZED
        );
    }

    const accessToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET as string
    );

    return {
        data: {
            username: user.firstName,
            accessToken: accessToken,
            isAdmin: user.isAdmin,
        },
        message: "User logged in successfully",
    };
};

export const getAllUsers = async (): Promise<Success<User[]>> => {
    logger.info("Getting all users");

    const users = await userModel.getAllUsers();

    return {
        data: users,
        message: "Users fetched successfully",
    };
};

export const getUser = async (userId: number): Promise<Success<User>> => {
    logger.info(`Getting user with id: ${userId}`);

    const user = await userModel.getUser(userId);

    return {
        data: user,
        message: "User fetched successfully",
    };
};

export const createUser = async (
    user: UserToInsert
): Promise<Success<User>> => {
    const { password } = user;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const insertedUser = await userModel.createUser({
        ...user,
        password: passwordHash,
    });

    logger.info("User created successfully");

    return {
        data: insertedUser,
        message: "User created successfully",
    };
};

export const updateUser = async (user: User): Promise<Success<User>> => {
    logger.info("Update controller");
    let updatedUserData: User = user;
    
    if (user.password) {
        const { password } = user;

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        updatedUserData = {
            ...user,
            password: passwordHash,
        };
    }

    const updatedUser = await userModel.updateUser(updatedUserData);
    logger.info("User updated successfully");

    return {
        data: updatedUser,
        message: "User updated successfully",
    };
};

export const deleteUser = async (userId: number): Promise<Success<User>> => {
    await userModel.deleteUser(userId);

    logger.info("User deleted successfully");

    return {
        message: "User deleted successfully",
    };
};
