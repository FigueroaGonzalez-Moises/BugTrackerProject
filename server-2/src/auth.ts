import "dotenv/config";
import { User } from "./entity/User";
import { sign } from "jsonwebtoken";

export const createAccessToken = (user: User) => {
    return sign(
        { userId: user.id, role: user.role },
        "bmkgIYxW1oaisXTW8eKUdARh2oVi1n75VQ8Q74Jv7q6Gp3fpmaFSFCgX5Loy5qPXp6boxHjtS524p5pr9vjiwglHWTFg7CLTBFF8As4LMfjPWY27tDhlhumlCrOODu4",
        { expiresIn: "15m" }
    );
};

export const createRefreshToken = (user: User) => {
    return sign(
        { userId: user.id, role: user.role },
        "Ox9SKolHH9XktFnZcDGkZhmw4kFNlz0OOs8vBxGT29E64c65yYf5urDs2QUcbQxs8PYlBySCSEOA9o1HsgWrTQCXuQ08vMbjK4eC8C04bcJjne52fjYwEdc7llt8ywa",
        {
            expiresIn: "7d",
        }
    );
};
