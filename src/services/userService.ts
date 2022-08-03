import { LoginCredentials } from "../domain/LoginCredentials";
import Success from "../domain/Success";
import logger from "../misc/logger";
import * as userModel from "../models/userModels";

/**
 * Get user login credentials
 * @returns {Promise<LoginCredentials>}
 */
export const getUserLoginCredentials = async (
    userName: string
): Promise<Success<LoginCredentials>> => {
    logger.info(`Getting login credentials with username: ${userName}`);

    const user = await userModel.getUserLoginCredentials(userName);

    return {
        data: user,
        message: "User fetched successfully",
    };
};
