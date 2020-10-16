import "dotenv/config";
import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../MyContext";
import { verify } from "jsonwebtoken";

interface payload {
    userId: number;
    role: string;
    iat: number;
    exp: number;
}

export const isAdmin: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];

    if (!process.env.ACCESS_TOKEN_SECRET) {
        console.log("ENV var undefined in isAdmin Middleware");
        return Promise.reject();
    }

    if (!authorization) {
        return Promise.reject();
    } else {
        try {
            const token = authorization.split(" ")[1];
            const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
            context.payload = payload as any;
            let temp = payload as payload;
            if (temp.role === "admin") {
                return next();
            } else {
                return Promise.reject();
            }
        } catch (error) {
            console.log("error :>> ", error);
            return Promise.reject();
        }
    }
};
