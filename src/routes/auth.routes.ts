/* eslint-disable new-cap */
import { Prisma } from "@prisma/client";
import { Router } from "express";
import * as bcrypt from "bcrypt";
import * as guid from "guid";
import * as jwt from "jsonwebtoken";
import prisma from "../db/database";
import { ExtRequest } from "../interfaces/user.interface";
import $rpass from "../pipes/rpass.pipe";
import AuthValidators from "../validators/auth.validators";
import $cookie from "../pipes/cookie.pipe";
import("dotenv").then(dotenv => dotenv.config());

const AuthRouter = Router()
    .get("/", async (req: ExtRequest, res) => {
        res.json({ me: req.user, data: await prisma.user.findMany() });
    })
    // Registration Logic
    .post("/register", AuthValidators.registration, async (req, res) => {
        try {
            const { username, email, password } =
                req.body as Prisma.UserCreateInput;
            const user = await prisma.user.create({
                data: {
                    username,
                    email,
                    password: await bcrypt.hash(password, 10),
                },
            });
            return res.status(201).json({
                message: "User created",
                user: $rpass(user),
            });
        } catch (error) {
            return res.status(500).send(error);
        }
    })
    // Login Logic
    .post("/login", AuthValidators.login, async (req: ExtRequest, res) => {
        try {
            const token = jwt.sign(
                { data: req.user.data },
                process.env.JWT_SECRET as string,
                { expiresIn: process.env.JWT_EXP as string }
            );
            const $guid = guid.raw();
            const rToken = jwt.sign(
                { data: $guid },
                process.env.JWT_SECRET as string,
                { expiresIn: process.env.RJWT_EXP as string }
            );
            await prisma.rToken.create({
                data: { guid: $guid, token: rToken, data: req.user.data },
            });
            return res
                .status(200)
                .cookie("rjwt", rToken, { httpOnly: true })
                .cookie("jwt", token, { httpOnly: true })
                .json({ token });
        } catch (error) {
            return res.status(500).json({ error: "Something went wrong" });
        }
    })
    // Logout Logic
    .post("/logout", async (req, res) => {
        console.log($cookie(req.headers.cookie));
        const rjwt = $cookie(req.headers.cookie)["rjwt"] as string;
        console.log(rjwt);
        await prisma.rToken.delete({ where: { token: rjwt } });
        res.clearCookie("jwt");
        res.clearCookie("rjwt");
        return res.status(200).json({ message: "Logged out" });
    })
    // Refresh Token Logic
    .post("/refresh", async (req: ExtRequest, res) => {
        try {
            const rjwt = $cookie(req.headers.cookie)["rjwt"] as string;
            const payload = jwt.verify(
                rjwt,
                process.env.JWT_SECRET as string
            ) as {
                data: string;
            };
            const rToken = await prisma.rToken.findUnique({
                where: { guid: payload.data },
            });
            if (!rToken)
                return res.status(401).json({ error: "Invalid token" });
            const token = jwt.sign(
                { data: rToken.data },
                process.env.JWT_SECRET as string,
                { expiresIn: process.env.JWT_EXP as string }
            );
            return res
                .status(200)
                .cookie("jwt", token, { httpOnly: true })
                .json({ token });
        } catch (error) {
            return res.status(500).json({ error: "Something went wrong" });
        }
    });

export default AuthRouter;
