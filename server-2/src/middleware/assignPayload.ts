import { MiddlewareFn } from "type-graphql";
import "dotenv/config";
import { MyContext } from "../MyContext";
import { verify } from "jsonwebtoken";

interface payload {
    userId: number;
    role: string;
    iat: number;
    exp: number;
}

export const assignPayload: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers["autorization"] as string;

    if (!authorization) {
        return Promise.reject();
    } else {
        if (!process.env.ACCESS_TOKEN_SECRET) {
            console.log("ACCESS_TOKEN_SECRET is undefined");
            return Promise.reject();
        } else {
            try {
                const token = authorization.split(" ")[1];
                const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
                context.payload = payload as payload;
                return next();
            } catch (err) {
                console.log("err :>> ", err);
                return Promise.reject();
            }
        }
    }
};
