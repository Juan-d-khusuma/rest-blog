/**
 * @author juan.d.khusuma
 * @GitHub https://github.com/Juan-d-khusuma
 */

import * as express from "express";
import * as cors from "cors";
import * as morgan from "morgan";
import * as jwt from "jsonwebtoken";
import * as parser from "body-parser";
import AuthRouter from "../routes/auth.routes";
import { ExtRequest } from "../interfaces/user.interface";

// Loads the environment variables from the .env file
import("dotenv").then(dotenv => dotenv.config());

// Global Variables
const app = express();
const PORT = process.env.PORT || 8000;

// 🛠 Middleware Configurations 🛠
app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    })
);
app.use(morgan("dev"));
app.use(parser.json());
app.use((req: ExtRequest, _res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            data: string;
        };
        req.user = decoded;
    } catch (error) {}
    next();
});

// 🛠 Routes 🛠
app.use("/api/v1/auth", AuthRouter);

// 🚀 Server Start 🚀
app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});
