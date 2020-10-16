import { MyContext } from "../MyContext";
import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";

interface payload {
    userId: number, 
    role: string,
    iat: number,
    exp: number 
}

export const isPm: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers['authorization'];

    if( !authorization ) {
        return Promise.reject();
    } else {
        try {
            const token = authorization.split(' ')[1];
            const payload = verify(token, 'bmkgIYxW1oaisXTW8eKUdARh2oVi1n75VQ8Q74Jv7q6Gp3fpmaFSFCgX5Loy5qPXp6boxHjtS524p5pr9vjiwglHWTFg7CLTBFF8As4LMfjPWY27tDhlhumlCrOODu4');
            context.payload = payload as payload;
            let tmp = payload as payload; 
            if( tmp.role !== 'developer') {
                return next();
            } else {
                return Promise.reject();
            }
        } catch (error) {
            console.log('error :>> ', error);
            return Promise.reject();
        }
    }
}