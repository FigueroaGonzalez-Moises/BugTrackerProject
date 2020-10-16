import {
    Resolver,
    Query,
    UseMiddleware,
    Arg,
    Mutation,
    Ctx,
} from "type-graphql";
import { projectTickets, projectUsers } from "../objectTypes";
import { isAuth } from "../middleware/isAuthMiddleware";
import { User } from "../entity/User";
import { MyContext } from "src/MyContext";
import { isPm } from "../middleware/isPmMiddleware";
import { ProjectData } from "../entity/ProjectData";
import { UserProjects } from "../entity/UserProjects";

@Resolver()
export class ProjectsResolver {
    @Query(() => [ProjectData])
    @UseMiddleware(isAuth)
    async getProjectData() {
        let tmp: ProjectData = await User.query("Select * FROM projects");
        return tmp;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async addProject(
        @Arg("title") title: string,
        @Arg("description") description: string,
        @Arg("users") users: string
    ) {
        try {
            let tmp = users.split(" ");
            await User.query(
                `INSERT INTO projects(title, description, projectid) VALUES ('${title}', '${description}', DEFAULT)`
            );
            let [projectid] = await User.query(
                `SELECT projectid FROM projects WHERE title = '${title}' AND description = '${description}'`
            );
            for (let i = 1; i < tmp.length; i++) {
                await User.query(
                    `INSERT INTO usersprojects(projectid, userid, id) VALUES ('${projectid.projectid}','${tmp[i]}', DEFAULT)`
                );
            }
        } catch (err) {
            console.log("err :>> ", err);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isPm)
    async deleteProject(@Arg("projectid") projectid: string) {
        try {
            await User.query(
                `DELETE FROM usersprojects WHERE projectid = \'${projectid}\'`
            );
            await User.query(
                `DELETE FROM projectstickets WHERE projectid = \'${projectid}\'`
            );
            let tickets = await User.query(
                `SELECT ticketid FROM tickets WHERE belongsto = \'${projectid}\'`
            );
            for (let i = 0; i < tickets.length; i++) {
                await User.query(
                    `DELETE FROM tickets WHERE ticketid = \'${tickets[i].ticketid}\'`
                );

                await User.query(
                    `DELETE FROM comments WHERE parentid = \'${tickets[i].ticketid}\'`
                );
            }
            await User.query(
                `DELETE FROM tickets WHERE belongsto = \'${projectid}\'`
            );
            await User.query(
                `DELETE FROM projects WHERE projectid = \'${projectid}\'`
            );
        } catch (error) {
            console.log("error :>> ", error);
            return false;
        }
        return true;
    }

    @Query(() => [ProjectData])
    @UseMiddleware(isAuth)
    async getProjectDataById(@Arg("projectid") projectid: string) {
        let tmp: ProjectData = await User.query(
            `Select * from projects where projectid = ${projectid}`
        );
        return tmp;
    }

    @Query(() => [projectTickets])
    @UseMiddleware(isAuth)
    async getProjectTickets(@Arg("id") id: string) {
        let tmp: projectTickets = await User.query(
            `SELECT * FROM projectstickets as p INNER JOIN tickets as t ON p.ticketid = t.ticketid WHERE projectID = ${id}`
        );
        return tmp;
    }

    @Query(() => [projectUsers])
    @UseMiddleware(isAuth)
    async getProjectUsersById(@Arg("projectid") projectid: string) {
        let tmp = await User.query(`SELECT users.id, users.email, users.role, users.username 
        FROM users 
        INNER JOIN usersprojects
        ON users.id = usersprojects.userid
        WHERE projectid = ${projectid}`);
        return tmp;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async setProjectDesc(
        @Arg("description") description: string,
        @Arg("projectid") projectid: string
    ) {
        try {
            User.query(
                `UPDATE projects SET description = \'${description}\' WHERE projectid = ${projectid}`
            );
        } catch (err) {
            console.log("err :>> ", err);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async setProjectTitle(
        @Arg("title") title: string,
        @Arg("projectid") projectid: string
    ) {
        try {
            User.query(
                `UPDATE projects SET title = \'${title}\' WHERE projectid = ${projectid}`
            );
        } catch (err) {
            console.log("err :>> ", err);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async removeProjectUser(
        @Arg("projectid") projectid: string,
        @Arg("userid") userid: string
    ) {
        try {
            User.query(
                `DELETE FROM usersprojects WHERE userid = \'${userid}\' AND projectid = \'${projectid}\'`
            );
        } catch (err) {
            console.log("err :>> ", err);
            return false;
        }
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async addProjectUser(
        @Arg("projectid") projectid: string,
        @Arg("userid") userid: string
    ) {
        try {
            User.query(
                `INSERT INTO usersprojects(projectid, userid, id) VALUES(\'${projectid}\', \'${userid}\', DEFAULT)`
            );
        } catch (err) {
            console.log("err :>> ", err);
            return false;
        }
        return true;
    }

    @Query(() => [UserProjects], { nullable: true })
    @UseMiddleware(isAuth)
    async getUserProjects(@Ctx() { payload }: MyContext) {
        try {
            let tmp = await User.query(
                `Select * from usersprojects where userid = \'${
                    payload!.userId
                }\'`
            );
            return tmp;
        } catch (err) {
            console.log("err :>> ", err);
            return false;
        }
    }
}
