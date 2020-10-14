import React, { useState } from "react";
import { GetLocation } from "../GetLocation";
import M from "materialize-css";
import {
    useAddCommentMutation,
    useGetCommentsQuery,
    useDeleteCommentMutation,
    useUpdateCommentMutation,
} from "../../generated/graphql";

const TicketComments: React.FC = () => {
    // eslint-disable-next-line
    let parentid: number = eval(GetLocation());

    const [ADD_COMMENT] = useAddCommentMutation();
    const [DELETE_COMMENT] = useDeleteCommentMutation();
    const [UPDATE_COMMENT] = useUpdateCommentMutation();
    const { data, loading } = useGetCommentsQuery({ variables: { parentid } });
    const [comment, setComment] = useState("");
    const addComment = async () => {
        if (comment.length === 0) {
            M.toast({ html: "Failed!" });
            M.toast({ html: "Comment cannot be empty" });
        } else {
            let tmp = await ADD_COMMENT({
                variables: {
                    comment,
                    parentid,
                },
            });

            if (tmp) {
                M.toast({ html: "Comment added successfully" });
                M.toast({ html: "Reloading" });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                M.toast({ html: "Failed! Server is most likely down" });
            }
        }
    };

    const deleteComment = async (commentid: number) => {
        if (!!commentid) {
            let tmp = await DELETE_COMMENT({ variables: { commentid } });

            if (tmp) {
                M.toast({ html: "Comment Deleted Successfully" });
                M.toast({ html: "Reloading" });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                M.toast({ html: "Failed! Server is most likely down" });
            }
        }
    };

    // eslint-disable-next-line
    const updateComment = async (commentid: number, updatedMessage: string) => {
        if (updatedMessage.length === 0) {
            M.toast({ html: "Failed!" });
            M.toast({ html: "Comment cannot be empty" });
        } else {
            let tmp = await UPDATE_COMMENT({
                variables: {
                    commentid,
                    updatedMessage,
                },
            });

            if (tmp) {
                M.toast({ html: "Comment Updated Successfully" });
                M.toast({ html: "Reloading" });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                M.toast({ html: "Failed! Server is most likely down" });
            }
        }
    };

    if (loading) {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        );
    }

    let comments: any = data?.getComments;

    return (
        <>
            <div className="container">
                <div className="center-align table-wrapper">
                    <span className="table-header z-depth-2">
                        <h2 className="white-text noselect">
                            Comments for Ticket #{parentid}
                        </h2>
                    </span>
                    <span className="table-body z-depth-1">
                        <table className="striped responsive">
                            <tbody>
                                <tr>
                                    <th>Commenter</th>
                                    <th>Comment</th>
                                    <th className="nonessen">Created At</th>
                                    <th>Delete</th>
                                </tr>

                                {comments.map((_val, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="capitalize">
                                                {comments[i].commenter}
                                            </td>
                                            <td className="capitalize">
                                                {comments[i].comment}
                                            </td>
                                            <td className="capitalize nonessen">
                                                {comments[i].createdAt}
                                            </td>
                                            <td>
                                                <i
                                                    className="material-icons red-text"
                                                    onClick={() =>
                                                        deleteComment(
                                                            comments[i]
                                                                .commentid
                                                        )
                                                    }
                                                >
                                                    delete
                                                </i>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="divider"></div>
                        <div className="row">
                            <div className="input-field">
                                <input
                                    id="comment"
                                    type="text"
                                    value={comment}
                                    onChange={e => setComment(e.target.value)}
                                />
                                <label htmlFor="comment">Add A Comment</label>
                                <button
                                    className="btn btn-ex safe-btn center footerBtn"
                                    onClick={() => addComment()}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </span>
                </div>
            </div>
        </>
    );
};

export default TicketComments;
