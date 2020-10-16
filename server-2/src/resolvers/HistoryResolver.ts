import { isAuth } from "../middleware/isAuthMiddleware";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { History } from "../entity/History";
@Resolver()
export class HistoryResolver {
    @Query(() => [History])
    @UseMiddleware(isAuth)
    async getHistory(@Arg("parentid") parentid: number) {
        try {
            let tmp = await History.find({ parentid });
            return tmp;
        } catch (err) {
            console.log("err :>> ", err);
            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async addTicketHistory(
        @Arg("parentid") parentid: number,
        @Arg("propertyChanged") propertyChanged: string,
        @Arg("newValue") newValue: string,
        @Arg("oldValue") oldValue: string
    ) {
        try {
            let d = new Date();
            await History.insert({
                parentid,
                propertyChanged,
                newValue,
                oldValue,
                dateChanged: d.toString(),
            });
            return true;
        } catch (err) {
            console.log("err :>> ", err);
            return false;
        }
    }
}
