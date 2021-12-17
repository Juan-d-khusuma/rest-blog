import { NextFunction, Request, Response } from "express";
import * as bcrypt from "bcrypt";
import prisma from "../db/database";
import { ExtRequest } from "../interfaces/user.interface";

/**
 * Class for auth server side validations
 */
export default class AuthValidators {
    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {any}
     */
    static async registration(req: Request, res: Response, next: NextFunction) {
        const { username, email, password } = req.body;
        if (!username || !password || !email)
            return res
                .status(400)
                .json({ error: "Missing username, password or email" });
        const user = await prisma.user.findUnique({
            where: {
                username,
            },
        });
        if (user)
            return res
                .status(400)
                .json({ error: "A user with this username already exists" });
        next();
    }
    /**
     *
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     * @return {any}
     */
    static async login(req: ExtRequest, res: Response, next: NextFunction) {
        const { username, password } = req.body;
        if (!username || !password)
            return res.status(400).json({ error: "Invalid Input" });
        const user = await prisma.user.findUnique({ where: { username } });
        if (!user)
            return res
                .status(400)
                .json({ error: "There is no user with that username" });
        if (!(await bcrypt.compare(password, user.password)))
            return res
                .status(400)
                .json({ error: "Invalid username or password" });
        req.user = {
            data: user.username,
        };
        next();
    }
}
