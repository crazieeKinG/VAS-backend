import { StatusCodes } from "http-status-codes";
import { LoginCredentials } from "../domain/LoginCredentials";
import CustomError from "../misc/CustomError";
import logger from "../misc/logger";
import adminCredentials from "../constants/adminCredentials.json";

/**
 * Get a single user login credentials by userName.
 * @param {string} userName
 * @returns {Promise<LoginCredentials>}
 */
export const getUserLoginCredentials = async (
    userName: string
): Promise<LoginCredentials> => {
    return new Promise((resolve, reject) => {
        const requiredUser = adminCredentials.find(
            (user) => user.userName === userName
        );
        if (requiredUser) {
            resolve(requiredUser);
        } else {
            logger.error(`User with userName: ${userName} not found`);
            reject(new CustomError("User not found", StatusCodes.NOT_FOUND));
        }
    });
};
