import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Ctx,
    UseMiddleware,
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from "../entity/User";
import { MyContext } from "../MyContext";
import { createRefreshToken, createAccessToken } from "../auth";
import { isAuth } from "../middleware/isAuthMiddleware";
import { sendRefreshToken } from "../sendRefreshToken";
import { UserData, AuthResponse } from "../objectTypes";
import { isAdmin } from "../middleware/isAdminMiddleware";

@Resolver()
export class UserResolver {
    @Query(() => [UserData], { nullable: true })
    @UseMiddleware(isAuth)
    async getUsers() {
        let tmp: UserData = await User.query(
            `SELECT id, email, role, username, firstname, lastname FROM users ORDER BY id`
        );
        return tmp;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAdmin)
    async updateRole(@Arg("role") role: string, @Arg("id") id: string) {
        try {
            await User.query(
                `UPDATE users SET role = \'${role}\' where id = \'${id}\'`
            );
        } catch (err) {
            console.log("err :>> ", err);
            return false;
        }
        return true;
    }

    @Query(() => User, { nullable: true })
    @UseMiddleware(isAuth)
    async getUser(@Ctx() { payload }: MyContext) {
        if (!payload) {
            return null;
        } else {
            let user = await User.findOne(payload!.userId);
            return user;
        }
    }

    @Mutation(() => AuthResponse)
    async login(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Ctx() { res }: MyContext
    ): Promise<AuthResponse> {
        try {
            const user = await User.findOne({ where: { email } });
            if (user) {
                const valid = await compare(password, user!.password);
                if (!valid) {
                    Promise.reject();
                    res.status(403).send("Not Authenticated");
                    return {
                        accessToken: "NOT_AUTH",
                    };
                }
            } else if (!user) {
                Promise.reject();
                res.status(403).send("Not Authenticated");
                return {
                    accessToken: "NOT_AUTH",
                };
            }

            return {
                accessToken: createAccessToken(user),
                refreshToken: createRefreshToken(user),
            };
        } catch (error) {
            console.log("error :>> ", error);
            res.status(500);
            return { accessToken: "NOT_AUTH" };
        }
    }

    @Mutation(() => AuthResponse)
    async register(
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Arg("role") role: string,
        @Arg("username") username: string,
        @Arg("firstname") firstname: string,
        @Arg("lastname") lastname: string
    ): Promise<AuthResponse> {
        const hashedPassword = await hash(password, 12);

        try {
            await User.insert({
                email,
                password: hashedPassword,
                role,
                username,
                firstname,
                lastname,
            });

            const user = await User.findOne({ email: email });

            if (!user) {
                return { accessToken: "" };
            }

            return {
                accessToken: createAccessToken(user),
                refreshToken: createRefreshToken(user),
            };
        } catch (err) {
            console.log("err :>> ", err);
            return {
                accessToken: "",
            };
        }
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() { res }: MyContext) {
        sendRefreshToken(res, "");
        return true;
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg("userid") userid: string) {
        try {
            const [user] = await User.query(
                `SELECT * FROM users WHERE id = ${userid}`
            );
            await User.query(`DELETE FROM users WHERE id = ${userid}`);
            await User.query(
                `DELETE FROM userstickets WHERE userid = ${userid}`
            );
            await User.query(
                `DELETE FROM usersprojects WHERE userid = ${userid}`
            );
            await User.query(
                `UPDATE tickets SET developer = 'NONE' WHERE developer = \'${user.username}\'`
            );
        } catch {
            return false;
        }
        return true;
    }

    @Mutation(() => AuthResponse)
    async demoLogin(
        @Arg("role") role: string,
        @Ctx() { res }: MyContext
    ): Promise<AuthResponse> {
        try {
            const user = await User.query(
                `SELECT * FROM users WHERE email = \'demo@demo.com\'`
            );
            if (!user) {
                res.status(403).send("Not Authenticated");
                return {
                    accessToken: "",
                };
            }
            await User.query(
                `UPDATE users SET role=\'${role}\' WHERE id = ${user[0].id}`
            );

            return {
                accessToken: createAccessToken(user),
                refreshToken: createRefreshToken(user),
            };
        } catch (err) {
            console.log("err :>> ", err);
            return {
                accessToken: "",
            };
        }
    }
}
