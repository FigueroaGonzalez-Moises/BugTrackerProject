import {
    Resolver,
    Arg,
    Mutation,
    Query,
    UseMiddleware,
    Ctx,
} from "type-graphql";
import { User } from "../entity/User";
import { UserTicketsPlus } from "../objectTypes";
import { isAuth } from "../middleware/isAuthMiddleware";
import { MyContext } from "../MyContext";
import { isPm } from "../middleware/isPmMiddleware";
import { TicketData } from "../entity/TicketData";
import { ProjectsTickets } from "../entity/ProjectsTickets";

@Resolver()
export class TicketsResolver {
    @Query(() => [TicketData])
    async getTickets() {
        let tmp = await User.query(`SELECT * FROM tickets`);
        return tmp;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isPm)
    async createTicket(
        @Arg("priority") priority: string,
        @Arg("title") title: string,
        @Arg("description") description: string,
        @Arg("type") type: string,
        @Arg("submitter") submitter: string,
        @Arg("developer") developer: string,
        @Arg("status") status: string,
        @Arg("belongsTo") belongsTo: string
    ) {
        try {
            await User.query(` INSERT INTO tickets(ticketid, priority, title, description, type, submitter, developer, status, belongsto)
            VALUES(DEFAULT, \'${priority}\', \'${title}\', \'${description}\', \'${type}\', \'${submitter}\', \'${developer}\', \'${status}\', ${belongsTo})`);
            let [temp] = await User.query(
                `SELECT ticketid FROM tickets WHERE title = \'${title}\' AND belongsto = \'${belongsTo}\' AND developer = \'${developer}\'`
            );
            await User.query(
                `INSERT INTO projectstickets(ticketid, projectid) VALUES(${temp.ticketid}, ${belongsTo})`
            );
            let [developerID] = await User.query(
                `SELECT id FROM users WHERE username = \'${developer}\'`
            );
            await User.query(
                `INSERT INTO userstickets(ticketid, userid, id) VALUES(${temp.ticketid}, ${developerID.id}, DEFAULT)`
            );
        } catch (error) {
            console.log("error :>> ", error);
            return false;
        }
        return true;
    }

    @Query(() => [TicketData])
    @UseMiddleware(isAuth)
    async getTicketDataById(@Arg("id") id: string) {
        let tmp: TicketData = await User.query(
            `SELECT * FROM tickets WHERE ticketid = ${id}`
        );
        return tmp;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async setTicketType(
        @Arg("ticketid") ticketid: string,
        @Arg("type") type: string
    ) {
        try {
            User.query(
                `UPDATE tickets SET type = \'${type}\' where ticketid = ${ticketid}`
            );
        } catch (error) {
            console.log("error :>> ", error);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async setTicketStatus(
        @Arg("ticketid") ticketid: string,
        @Arg("status") status: string
    ) {
        try {
            User.query(
                `UPDATE tickets SET status = \'${status}\' where ticketid = ${ticketid}`
            );
        } catch (error) {
            console.log("error :>> ", error);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async setTicketDesc(
        @Arg("ticketid") ticketid: string,
        @Arg("desc") desc: string
    ) {
        try {
            User.query(
                `UPDATE tickets SET description = \'${desc}\' where ticketid = ${ticketid}`
            );
        } catch (error) {
            console.log("error :>> ", error);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async setTicketTitle(
        @Arg("ticketid") ticketid: string,
        @Arg("title") title: string
    ) {
        try {
            User.query(
                `UPDATE tickets SET title = \'${title}\' where ticketid = ${ticketid}`
            );
        } catch (error) {
            console.log("error :>> ", error);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async setTicketPriority(
        @Arg("ticketid") ticketid: string,
        @Arg("priority") priority: string
    ) {
        try {
            await User.query(
                `UPDATE tickets SET priority = \'${priority}\' WHERE ticketid = ${ticketid}`
            );
        } catch (error) {
            console.log("error :>> ", error);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isPm)
    async setTicketDeveloper(
        @Arg("ticketid") ticketid: string,
        @Arg("developer") developer: string
    ) {
        try {
            await User.query(
                `UPDATE tickets SET developer=\'${developer}\' WHERE ticketid=${ticketid}`
            );
            let [userid] = await User.query(
                `SELECT id FROM users WHERE username = \'${developer}\'`
            );
            await User.query(
                `UPDATE userstickets SET userid= \'${userid.id}\' WHERE ticketid = ${ticketid}`
            );
        } catch (error) {
            console.log("error :>> ", error);
            return false;
        }
        return true;
    }

    @Query(() => [UserTicketsPlus])
    @UseMiddleware(isAuth)
    async getUserTickets(@Ctx() { payload }: MyContext) {
        try {
            let temp = await User.query(`
                SELECT u.ticketid, u.userid, u.id, t.priority, t.type, t.status, t.title
                FROM userstickets as u
                INNER JOIN tickets as t
                ON u.ticketid = t.ticketid
                WHERE userid = ${payload!.userId}`);
            return temp;
        } catch (err) {
            console.log("err :>> ", err);
            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteTicket(@Arg("ticketid") ticketid: string) {
        try {
            await User.query(
                `DELETE FROM userstickets WHERE ticketid = ${ticketid}`
            );
            await User.query(
                `DELETE FROM projectstickets WHERE ticketid = ${ticketid}`
            );
            await User.query(
                `DELETE FROM tickets WHERE ticketid = ${ticketid}`
            );
            await User.query(
                `DELETE FROM comments WHERE parentid = ${ticketid}`
            );
            await User.query(
                `DELETE FROM history WHERE parentid = ${ticketid}`
            );
        } catch (err) {
            console.log("err :>> ", err);
            return false;
        }
        return true;
    }

    @Query(() => [ProjectsTickets])
    @UseMiddleware(isAuth)
    async getTicketProject(@Arg("ticketid") ticketid: string) {
        try {
            let tmp = await User.query(
                `SELECT * FROM projectstickets WHERE ticketid = ${ticketid}`
            );
            return tmp;
        } catch (error) {
            console.log("error :>> ", error);
            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isPm)
    async setTicketProject(
        @Arg("ticketid") ticketid: string,
        @Arg("projectid") projectid: string
    ) {
        try {
            await User.query(
                `UPDATE tickets SET belongsto = \'${projectid}\' WHERE ticketid = \'${ticketid}\'`
            );
            await User.query(
                `UPDATE projectstickets SET projectid = \'${projectid}\' WHERE ticketid = \'${ticketid}\'`
            );
        } catch (error) {
            console.log("error :>> ", error);
            return false;
        }
        return true;
    }
}
