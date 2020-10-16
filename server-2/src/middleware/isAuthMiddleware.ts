import { MiddlewareFn } from "type-graphql/dist/interfaces/Middleware";
import { MyContext } from "../MyContext";
import { verify } from 'jsonwebtoken';

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    const authorization = context.req.headers['authorization'];

    if (!authorization) {
        return Promise.reject();
    } else {
        try {
            const token = authorization.split(' ')[1];
            const payload = verify(token, 'bmkgIYxW1oaisXTW8eKUdARh2oVi1n75VQ8Q74Jv7q6Gp3fpmaFSFCgX5Loy5qPXp6boxHjtS524p5pr9vjiwglHWTFg7CLTBFF8As4LMfjPWY27tDhlhumlCrOODu4');
            context.payload = payload as any;
            return next();
        }
        catch (err) {
            console.log('error :>> ', err);
            return Promise.reject();
        }
    }
}