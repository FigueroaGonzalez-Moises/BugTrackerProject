import "dotenv/config";
import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";
import { MyContext } from "../MyContext";
import { verify } from "jsonwebtoken";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers["authorization"];

    if (!process.env.ACCESS_TOKEN_SECRET) {
        console.log("ENV var undefined in isAuth Middleware");
        return Promise.reject();
    }

    if (!authorization) {
        return Promise.reject();
    } else {
        try {
            const token = authorization.split(" ")[1];
            const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
            context.payload = payload as any;
            return next();
        } catch (err) {
            console.log("error :>> ", err);
            return Promise.reject();
        }
    }
};
