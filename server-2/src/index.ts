import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { User } from "./entity/User";
import { ApolloServer } from "apollo-server-express";
import { UserResolver } from "./resolvers/UserResolver";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import cors from "cors";
import { createAccessToken, createRefreshToken } from "./auth";
import { ProjectsResolver } from "./resolvers/ProjectsResolver";
import { TicketsResolver } from "./resolvers/TicketsResolver";
import { createTypeormConn } from "./CreateTypeormConn";
import { CommentsResolver } from "./resolvers/CommentsResolver";
import { HistoryResolver } from "./resolvers/HistoryResolver";

(async () => {
    const app = express();

    if (process.env.NODE_ENV === "production") {
        app.use(
            cors({
                origin: "https://figueroagonzalez-moises.github.io",
                credentials: true,
            })
        );
    } else {
        app.use(
            cors({
                origin: "http://localhost:3000",
                credentials: true,
            })
        );
    }
    app.use(cookieParser());
    app.get("/", (_req, res) => res.send("Hiii :)"));

    app.post("/refresh_token", async (req, res) => {
        const token = req.headers.refreshtoken as string;

        if (!token) {
            return res.status(499).send({ accessToken: "" });
        }

        let payload;

        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch (err) {
            console.log("err :>> ", err);
            return res.status(500).send({ accessToken: "" });
        }

        const user = await User.findOne({ id: payload.userId });

        if (!user) {
            return res.status(401).send({ accessToken: "" });
        }

        return res.status(200).send({
            accessToken: createAccessToken(user),
            refreshToken: createRefreshToken(user),
        });
    });

    app.post("/check-refresh-token", async (req, res) => {
        const refreshToken = req.cookies.jid;
        if (!refreshToken) {
            return res.status(499).send({ ok: false });
        } else {
            return res.status(200).send({ ok: true });
        }
    });

    await createTypeormConn();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [
                UserResolver,
                ProjectsResolver,
                TicketsResolver,
                CommentsResolver,
                HistoryResolver,
            ],
        }),
        context: ({ req, res }) => ({ req, res }),
    });

    apolloServer.applyMiddleware({ app, cors: false });

    let PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Express server listening on ${PORT}`);
    });
})();
