interface User {
    id: number;
    firstName: string;
    lastName: string;
    dob: string;
    ethnicity: string;
    gender: string;
    email: string;
    password: string;
    isAdmin: boolean;
    documentUrl: string;
}

export type UserToInsert = Omit<User, "id">;

export default User;
