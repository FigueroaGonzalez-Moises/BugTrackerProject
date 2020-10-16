import { Comments } from "../entity/Comments";
import { isAuth } from "../middleware/isAuthMiddleware";
import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { MyContext } from "../MyContext";
import { User } from "../entity/User";

@Resolver()
export class CommentsResolver {
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async addComment(
        @Arg("comment") comment: string,
        @Arg("parentid") parentid: number,
        @Ctx() { payload }: MyContext
    ) {
        try {
            var user = User.findOneOrFail({ id: payload!.userId });
            let username = (await user).username;
            let d = new Date();
            await Comments.insert({
                comment,
                parentid: parentid,
                commenterid: payload!.userId,
                commenter: username,
                createdAt: d.toString(),
            });
            return true;
        } catch (err) {
            console.log("Could not insert comment Error :>> ", err);
            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deleteComment(@Arg("commentid") commentid: number) {
        try {
            await Comments.delete({ commentid });
            return true;
        } catch (err) {
            console.log("err :>> ", err);
            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateComment(
        @Arg("commentid") commentid: number,
        @Arg("updatedMessage") updatedMessage: string
    ) {
        if (updatedMessage.length > 0) {
            try {
                let comment: any = await Comments.findOne(commentid);
                if (!!comment) {
                    let result = await Comments.merge(comment, {
                        comment: updatedMessage,
                    });
                    await Comments.save(result);
                    return true;
                } else {
                    return false;
                }
            } catch (err) {
                console.log("err :>> ", err);
                return false;
            }
        } else {
            return false;
        }
    }

    @Query(() => [Comments])
    @UseMiddleware(isAuth)
    async getComments(@Arg("parentid") parentid: number) {
        try {
            let tmp = await Comments.find({ parentid });
            return tmp;
        } catch (err) {
            console.log("err :>>", err);
            return {};
        }
    }
}
