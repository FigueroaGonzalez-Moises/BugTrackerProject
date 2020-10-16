import "dotenv/config";
import { getConnectionOptions, createConnection, getRepository } from "typeorm";
import { User } from "./entity/User";
import { hash } from "bcryptjs";

export const createTypeormConn = async () => {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

    if (process.env.NODE_ENV === "production") {
        try {
            await createConnection({
                ...connectionOptions,
                type: "postgres",
                url: process.env.DATABASE_URL,
                entities: [__dirname + "/entity/**/*.js"],
                name: "default",
            } as any);
        } catch (error) {
            console.log("Could not connect to Database Error :>> ", error);
        }

        try {
            let t = await User.findOne({ email: "demo@demo.com" });
            if (!t) {
                let userRepo: any = getRepository(User);
                const hashedPassword = await hash("demoPassword", 12);
                const user = userRepo.create({
                    firstname: "Demo",
                    lastname: "User",
                    password: hashedPassword,
                    email: "demo@demo.com",
                    role: "admin",
                    username: "DemoUser",
                });

                try {
                    await userRepo.save(user);
                } catch (e) {
                    console.log("Could not save user ERROR :>>", e);
                }
            }
        } catch (err) {
            console.log("Error occured while creating demo user :>> ", err);
        }
    } else {
        try {
            await createConnection({
                ...connectionOptions,
                name: "default",
            } as any);
        } catch (e) {
            console.log("Could not connect to DB ERR: " + e);
        }

        let t = await User.findOne({ email: "demo@demo.com" });
        if (!t) {
            let userRepo: any = getRepository(User);
            const hashedPassword = await hash("demoPassword", 12);
            const user = userRepo.create({
                firstname: "Demo",
                lastname: "User",
                password: hashedPassword,
                email: "demo@demo.com",
                role: "admin",
                username: "DemoUser",
            });

            try {
                await userRepo.save(user);
                console.log("New User Saved with id" + user.id);
            } catch (e) {
                console.log("ERROR: ", e);
            }
        }
    }
};
