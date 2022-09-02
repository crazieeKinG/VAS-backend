import { USER_DATA_TO_SEND } from "../constants/tableConstants";
import db from "../db/db";
import User, { UserToInsert } from "../domain/User";
import { databaseError } from "../utils/errors";

class UserAccount {
    public static table = "user_account";

    public static async getAllUsers() {
        const users = await db(UserAccount.table).select(USER_DATA_TO_SEND);

        return users;
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
        const user = await db(UserAccount.table)
            .where({ id: userId })
            .select(USER_DATA_TO_SEND)
            .first();

        return user;
    }

    public static async getUserByEmail(email: string): Promise<User> {
        const user = await db(UserAccount.table)
            .where({ email: email })
            .select()
            .first();

        return user;
    }

    public static async updateUser(user: User): Promise<User> {
        const [updatedUser] = await db(UserAccount.table)
            .where({ id: user.id })
            .update(user)
            .returning(USER_DATA_TO_SEND);

        return updatedUser;
    }

    public static async deleteUser(userId: number): Promise<void> {
        await db(UserAccount.table).where({ id: userId }).delete();
    }
}

export default UserAccount;
