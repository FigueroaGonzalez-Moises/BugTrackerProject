import React, { useEffect } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useGetProjectDataByIdQuery } from "../../generated/graphql";
import { GetLocation } from "../GetLocation";
import { useSelector } from "react-redux";
import { State, User } from "../../redux/RootReducer";
import useGetProjectTickets from "./useGetProjectTickets";
import { Sorting } from "../Sorting";
import { useState } from "react";
import useGetProjectUsers from "./useGetProjectUsers";

export const ProjectDetails: React.FC = () => {
    let history: any = useHistory();
    let id = GetLocation();
    const {
        sortByTitle,
        sortBySubmitter,
        sortByDeveloper,
        sortTicketsByStatus,
        usernameSort,
        emailSort,
        roleSort,
    } = Sorting();
    const [state, setState] = useState({
        toggle: "0",
        titleSwitch: "0",
        usernameSwitch: "0",
        emailSwitch: "0",
        roleSwitch: "0",
        submitterSwitch: "0",
        developerSwitch: "0",
    });

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

    let Tickets = useGetProjectTickets();
    let AssignedUsers = useGetProjectUsers();

    const { data, loading } = useGetProjectDataByIdQuery({
        variables: { projectid: `${id}` },
    });

    useEffect(() => {
        var elems = document.querySelectorAll(".sidenav");
        M.Sidenav.init(elems);
    });

    if (loading || !data || !AssignedUsers || !Tickets) {
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
                                                    <b>
                                                        User Name
                                                        <i
                                                            className="material-icons noselect"
                                                            onClick={() => {
                                                                let usernameSwitch: string = usernameSort(
                                                                    AssignedUsers,
                                                                    state.usernameSwitch
                                                                );
                                                                setState({
                                                                    ...state,
                                                                    usernameSwitch,
                                                                });
                                                            }}
                                                        >
                                                            swap_vert
                                                        </i>
                                                    </b>
                                                </th>
                                                <th className="nonessen">
                                                    <b>
                                                        Email
                                                        <i
                                                            className="material-icons noselect"
                                                            onClick={() => {
                                                                let emailSwitch: string =
                                                                    emailSort(
                                                                        AssignedUsers,
                                                                        state.emailSwitch
                                                                    ) || "0";
                                                                setState({
                                                                    ...state,
                                                                    emailSwitch,
                                                                });
                                                            }}
                                                        >
                                                            swap_vert
                                                        </i>
                                                    </b>
                                                </th>
                                                <th className="nonessen">
                                                    <b>
                                                        Role
                                                        <i
                                                            className="material-icons noselect"
                                                            onClick={() => {
                                                                let roleSwitch: string =
                                                                    roleSort(
                                                                        AssignedUsers,
                                                                        state.roleSwitch
                                                                    ) || "0";
                                                                setState({
                                                                    ...state,
                                                                    roleSwitch,
                                                                });
                                                            }}
                                                        >
                                                            swap_vert
                                                        </i>
                                                    </b>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {AssignedUsers!.map(
                                                (_val, i): JSX.Element => {
                                                    return (
                                                        <tr key={i}>
                                                            <td className="capitalize nonessen">
                                                                {
                                                                    AssignedUsers![
                                                                        i
                                                                    ].username
                                                                }
                                                            </td>
                                                            <td className="capitalize nonessen">
                                                                {
                                                                    AssignedUsers![
                                                                        i
                                                                    ].email
                                                                }
                                                            </td>
                                                            <td className="capitalize">
                                                                {
                                                                    AssignedUsers![
                                                                        i
                                                                    ].role
                                                                }
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )}
                                        </tbody>
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
                                                    <b>
                                                        Title
                                                        <i
                                                            className="material-icons noselect"
                                                            onClick={() => {
                                                                let titleSwitch = sortByTitle(
                                                                    Tickets,
                                                                    state.titleSwitch
                                                                );
                                                                setState({
                                                                    ...state,
                                                                    titleSwitch,
                                                                });
                                                            }}
                                                        >
                                                            swap_vert
                                                        </i>
                                                    </b>
                                                </th>
                                                <th className="nonessen">
                                                    <b>
                                                        Submitter
                                                        <i
                                                            className="material-icons noselect"
                                                            onClick={() => {
                                                                let submitterSwitch = sortBySubmitter(
                                                                    Tickets,
                                                                    state.submitterSwitch
                                                                );
                                                                setState({
                                                                    ...state,
                                                                    submitterSwitch,
                                                                });
                                                            }}
                                                        >
                                                            swap_vert
                                                        </i>
                                                    </b>
                                                </th>
                                                <th className="nonessen">
                                                    <b>
                                                        Developer
                                                        <i
                                                            className="material-icons noselect"
                                                            onClick={() => {
                                                                let developerSwitch = sortByDeveloper(
                                                                    Tickets,
                                                                    state.developerSwitch
                                                                );
                                                                setState({
                                                                    ...state,
                                                                    developerSwitch,
                                                                });
                                                            }}
                                                        >
                                                            swap_vert
                                                        </i>
                                                    </b>
                                                </th>
                                                <th>
                                                    <b>
                                                        Status
                                                        <i
                                                            className="material-icons noselect"
                                                            onClick={() => {
                                                                let toggle: string =
                                                                    sortTicketsByStatus(
                                                                        Tickets,
                                                                        state.toggle
                                                                    ) || "0";
                                                                setState({
                                                                    ...state,
                                                                    toggle,
                                                                });
                                                            }}
                                                        >
                                                            swap_vert
                                                        </i>
                                                    </b>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {!Tickets
                                                ? null
                                                : Tickets!.map((_val, i) => {
                                                      return (
                                                          <tr key={i}>
                                                              <td className="capitalize">
                                                                  {
                                                                      Tickets![
                                                                          i
                                                                      ].title
                                                                  }
                                                              </td>
                                                              <td className="capitalize nonessen">
                                                                  {
                                                                      Tickets![
                                                                          i
                                                                      ]
                                                                          .submitter
                                                                  }
                                                              </td>
                                                              <td className="capitalize nonessen">
                                                                  {
                                                                      Tickets![
                                                                          i
                                                                      ]
                                                                          .developer
                                                                  }
                                                              </td>
                                                              <td className="capitalize">
                                                                  {
                                                                      Tickets![
                                                                          i
                                                                      ].status
                                                                  }
                                                              </td>
                                                              <td>
                                                                  <a
                                                                      className="noselect"
                                                                      href={`#/ticket-details:${
                                                                          Tickets![
                                                                              i
                                                                          ]
                                                                              .ticketid
                                                                      }`}
                                                                  >
                                                                      Details
                                                                  </a>
                                                              </td>
                                                          </tr>
                                                      );
                                                  })}
                                        </tbody>
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
