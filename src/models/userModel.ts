import { USER_DATA_TO_SEND } from "../constants/tableConstants";
import db from "../db/db";
import User, { UserToInsert } from "../domain/User";
import { databaseError } from "../utils/errors";

class UserAccount {
    public static table = "user_account";

    public static async getAllUsers() {
        try {
            const users = await db(UserAccount.table).select(USER_DATA_TO_SEND);

            return users;
        } catch (error) {
            throw databaseError;
        }
    }

    public static async createUser(user: UserToInsert) {
        try {
            const newUser = await db(UserAccount.table).insert(user, ["id"]);

            return newUser;
        } catch (error) {
            throw databaseError;
        }
    }

    public static async getUser(userId: number): Promise<User> {
        try {
            const user = await db(UserAccount.table)
                .where({ id: userId })
                .select(USER_DATA_TO_SEND)
                .first();

            return user;
        } catch (error) {
            throw databaseError;
        }
    }

    public static async getUserByEmail(email: string): Promise<User> {
        try {
            const user = await db(UserAccount.table)
                .where({ email: email })
                .select()
                .first();

            return user;
        } catch (error) {
            throw databaseError;
        }
    }

    public static async updateUser(user: User): Promise<User> {
        try {
            const [updatedUser] = await db(UserAccount.table)
                .where({ id: user.id })
                .update(user)
                .returning(USER_DATA_TO_SEND);

            return updatedUser;
        } catch (error) {
            throw databaseError;
        }
    }

    public static async deleteUser(userId: number): Promise<void> {
        try {
            await db(UserAccount.table).where({ id: userId }).delete();
        } catch (error) {
            throw databaseError;
        }
    }
}

export default UserAccount;
