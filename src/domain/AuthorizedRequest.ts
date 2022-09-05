import { Request } from "express";

export interface AuthorizedRequest extends Request {
    currentUser?: number;
}

export interface TokenPayload {
    userId: number;
}
