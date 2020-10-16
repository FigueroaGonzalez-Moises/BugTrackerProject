import "dotenv/config";
import { User } from "./entity/User";
import { sign } from "jsonwebtoken";

export const createAccessToken = (user: User) => {
    if (!process.env.ACCESS_TOKEN_SECRET) {
        console.log("ACCESS_TOKEN undefined in auth.ts");
        return null;
    }
    return sign(
        { userId: user.id, role: user.role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    );
};

export const createRefreshToken = (user: User) => {
    if (!process.env.REFRESH_TOKEN_SECRET) {
        console.log("REFRESH_TOKEN undefined in auth.ts");
        return null;
    }
    return sign(
        { userId: user.id, role: user.role },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "7d",
        }
    );
};
