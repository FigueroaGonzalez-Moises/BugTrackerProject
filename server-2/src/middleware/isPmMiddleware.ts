import "dotenv/config";
import { MyContext } from "../MyContext";
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";

interface payload {
    userId: number;
    role: string;
    iat: number;
    exp: number;
}

export const isPm: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];

    if (!process.env.ACCESS_TOKEN_SECRET) {
        console.log("ENV var undefined in isPm Middleware");
        return Promise.reject();
    }

    if (!authorization) {
        return Promise.reject();
    } else {
        try {
            const token = authorization.split(" ")[1];
            const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
            context.payload = payload as payload;
            let tmp = payload as payload;
            if (tmp.role !== "developer") {
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
