import React, { useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useGetProjectDataByIdQuery } from "../../generated/graphql";
import { ProjectTickets } from "./ProjectTickets";
import { ProjectAssigned } from "./ProjectAssigned";
import { GetLocation } from "../GetLocation";
import { useSelector } from "react-redux";
import { State, User } from "../../redux/RootReducer";

export const ProjectDetails: React.FC = () => {
    let history: any = useHistory();
    let id = GetLocation();
    const user = useSelector<State, User>(
        state =>
            state.user || {
                id: 0,
                email: "",
                role: "",
                username: "",
                firstname: "",
                lastname: "",
            }
    );
    const { data, loading } = useGetProjectDataByIdQuery({
        variables: { projectid: `${id}` },
    });

    useEffect(() => {
        var elems = document.querySelectorAll(".sidenav");
        M.Sidenav.init(elems);
    });

    if (loading || !data) {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        );
    }
    return (
        <span>
            {data.getProjectDataById.length === 0 ? (
                <Redirect to="#/dashboard" />
            ) : (
                <div className="detailsWrapper container-fluid">
                    <div className="center-align table-wrapper">
                        <span className="table-header z-depth-2">
                            <h2 className="white-text">
                                Details for Project #{id}
                            </h2>
                        </span>

                        <span className="table-body z-depth-1">
                            <table className="striped">
                                <thead>
                                    <tr>
                                        <th>Project Name</th>
                                        <th>Project Description</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>
                                            {data.getProjectDataById[0].title}
                                        </td>
                                        <td>
                                            {
                                                data.getProjectDataById[0]
                                                    .description
                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="row">
                                <span className="col s5 m5 l5 xl5">
                                    <span className="personnel-header z-depth-2 col s12 m12 l12 xl12">
                                        <h3 className="white-text">
                                            Assigned Personnel
                                        </h3>
                                    </span>

                                    <table className="striped">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <b>User Name</b>
                                                </th>
                                                <th className="nonessen">
                                                    <b>Email</b>
                                                </th>
                                                <th className="nonessen">
                                                    <b>Role</b>
                                                </th>
                                            </tr>
                                        </thead>

                                        <ProjectAssigned />
                                    </table>
                                </span>

                                <span className="col s5 m5 l5 xl5 offset-s2 offset-m2 offset-l2 offset-xl2">
                                    <span className="tickets-header z-depth-2 col s12 m12 l12 xl12">
                                        <h3 className="white-text">
                                            Tickets for Project #{id}
                                        </h3>
                                    </span>

                                    <table className="striped">
                                        <thead>
                                            <tr>
                                                <th>
                                                    <b>Title</b>
                                                </th>
                                                <th className="nonessen">
                                                    <b>Submitter</b>
                                                </th>
                                                <th className="nonessen">
                                                    <b>Developer</b>
                                                </th>
                                                <th>
                                                    <b>Status</b>
                                                </th>
                                            </tr>
                                        </thead>

                                        <ProjectTickets />
                                    </table>
                                </span>
                            </div>
                            <div className="divider"></div>

                            <button
                                className="btn left footerBtn"
                                onClick={() => history.goBack()}
                            >
                                Go Back
                            </button>
                            {user.role === "developer" ? null : (
                                <a href={`#/edit-project:${id}`}>
                                    <button className="btn right footerBtn">
                                        Edit
                                    </button>
                                </a>
                            )}
                        </span>
                    </div>
                </div>
            )}
        </span>
    );
};
