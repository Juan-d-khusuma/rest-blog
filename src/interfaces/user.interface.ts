import { Request } from "express";

export interface User {
    data: string;
}

export interface LoginInput {
    username: string;
    password: string;
}

export interface ExtRequest extends Request {
    user: User;
}
