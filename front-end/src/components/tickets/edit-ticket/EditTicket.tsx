import React, { useEffect, useState } from "react";
import {
    useGetTicketDataByIdQuery,
    useSetTicketStatusMutation,
    useSetTicketTypeMutation,
    useSetTicketTitleMutation,
    useSetTicketDescMutation,
    useSetTicketPriorityMutation,
    useDeleteTicketMutation,
    useAddTicketHistoryMutation,
    useSetTicketProjectMutation,
    useSetTicketDeveloperMutation,
} from "../../../generated/graphql";
import { useHistory, Redirect } from "react-router-dom";
import M from "materialize-css";
import { GetLocation } from "../../GetLocation";
import { useSelector } from "react-redux";
import { State, User } from "../../../redux/RootReducer";
import { JsFooterStyling } from "../../../css/JsStyling";
import { useGetProjects } from "../../project/useGetProjects";
import { useGetUsers } from "../useGetUsers";

export const EditTicket: React.FC = () => {
    const history: any = useHistory();
    let ticketid = GetLocation();
    // eslint-disable-next-line
    var parentid = eval(ticketid);
    const { data, loading } = useGetTicketDataByIdQuery({
        variables: { id: `${ticketid}` },
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
    const [setStatus] = useSetTicketStatusMutation();
    const [setType] = useSetTicketTypeMutation();
    const [setTitle] = useSetTicketTitleMutation();
    const [setDesc] = useSetTicketDescMutation();
    const [setPriority] = useSetTicketPriorityMutation();
    const [SetTicketProject] = useSetTicketProjectMutation();
    const [DeleteThisTicket] = useDeleteTicketMutation();
    const [addHistory] = useAddTicketHistoryMutation();
    const [setDeveloper] = useSetTicketDeveloperMutation();
    const [state, setState] = useState({
        status: "",
        type: "",
        title: "",
        description: "",
        priority: "",
        projectid: "",
        parentTitle: "",
        assignedTo: "",
        new: false,
        developer: "",
    });

    let Projects = useGetProjects();
    let Users = useGetUsers();

    useEffect(() => {
        var elems = document.querySelectorAll(".dropdown-trigger");
        M.Dropdown.init(elems);
        elems = document.querySelectorAll(".modal");
        M.Modal.init(elems);
        elems = document.querySelectorAll(".sidenav");
        M.Sidenav.init(elems);
        JsFooterStyling();
    });

    window.onresize = () => {
        JsFooterStyling();
    };

    if (loading || !data || !Projects || !Users) {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        );
    }

    if (data.getTicketDataById.length === 0) {
        return <Redirect to="#/manage-projects" />;
    }

    const updateTicket = async () => {
        try {
            if (state.title !== "") {
                let oldValue: string = data.getTicketDataById[0].title!;
                setState({ ...state, new: true });
                if (state.title !== "") {
                    let tmp = await setTitle({
                        variables: {
                            ticketid: `${ticketid}`,
                            title: `${state.title}`,
                        },
                    });
                    if (tmp) {
                        M.toast({ html: "Ticket Title successfully changed" });
                        addHistory({
                            variables: {
                                propertyChanged: "TicketTitle",
                                newValue: state.title,
                                oldValue,
                                parentid,
                            },
                        });
                    } else {
                        M.toast({ html: "Failed! Server is most likely down" });
                    }
                }
            }

            if (state.description !== "") {
                await setDesc({
                    variables: {
                        ticketid: `${ticketid}`,
                        desc: `${state.description}`,
                    },
                });
                let oldValue: string = data.getTicketDataById[0].description!;
                addHistory({
                    variables: {
                        propertyChanged: "TicketDescription",
                        newValue: state.description,
                        oldValue,
                        parentid,
                    },
                });
            }

            if (state.status !== "") {
                let oldValue: string = data.getTicketDataById[0].status!;
                await setStatus({
                    variables: {
                        ticketid: `${ticketid}`,
                        status: `${state.status}`,
                    },
                });
                await addHistory({
                    variables: {
                        propertyChanged: "TicketStatus",
                        oldValue,
                        parentid,
                        newValue: state.status,
                    },
                });
            }

            if (state.priority !== "") {
                let oldValue: string = data.getTicketDataById[0].priority!;
                await setPriority({
                    variables: {
                        ticketid: `${ticketid}`,
                        priority: `${state.priority}`,
                    },
                });
                addHistory({
                    variables: {
                        propertyChanged: "TicketPriority",
                        oldValue,
                        parentid,
                        newValue: state.priority,
                    },
                });
            }

            if (state.type !== "") {
                let oldValue: string = data.getTicketDataById[0].type!;
                await setType({
                    variables: {
                        ticketid: `${ticketid}`,
                        type: `${state.type}`,
                    },
                });
                addHistory({
                    variables: {
                        propertyChanged: "TicketType",
                        oldValue,
                        parentid,
                        newValue: state.type,
                    },
                });
            }

            if (state.projectid !== "") {
                let oldValue: string = data.getTicketDataById[0].belongsto;
                await SetTicketProject({
                    variables: {
                        ticketid,
                        projectid: state.projectid,
                    },
                });

                addHistory({
                    variables: {
                        propertyChanged: "ParentOfTicket",
                        oldValue: `ProjectId: ${oldValue}`,
                        parentid,
                        newValue: `ProjectId: ${state.projectid}`,
                    },
                });
            }

            if (state.developer !== "") {
                let oldValue: string = data.getTicketDataById[0].developer;
                if (user.role === "admin" || user.role === "project-manager") {
                    await setDeveloper({
                        variables: {
                            ticketid,
                            developer: state.developer,
                        },
                    });

                    addHistory({
                        variables: {
                            propertyChanged: "AssignedDeveloper",
                            oldValue,
                            parentid,
                            newValue: state.developer,
                        },
                    });
                }
            }
        } catch (err) {
            M.toast({ html: "Could not update Ticket" });
            M.toast({ html: `Error : ${err}` });
        }

        window.location.reload();
    };
    console.log("Users :>> ", Users);

    const deleteTicket = async () => {
        await DeleteThisTicket({
            variables: {
                ticketid: `${ticketid}`,
            },
        });
        window.location.replace("#/dashboard");
    };

    return (
        <div className="container">
            <div className="center-align table-wrapper">
                <span className="table-header z-depth-2">
                    <h2 className="white-text noselect">
                        Edit Ticket #{ticketid}
                    </h2>
                </span>

                <span className="table-body z-depth-1">
                    <table className="striped responsive">
                        <tbody>
                            <tr>
                                <th>TITLE</th>
                                <th>DESCRIPTION</th>
                            </tr>

                            <tr>
                                <td>
                                    <div className="input-field">
                                        <input
                                            type="text"
                                            id="title"
                                            className="validate"
                                            value={state.title}
                                            onChange={e =>
                                                setState({
                                                    ...state,
                                                    title: e.target.value,
                                                })
                                            }
                                        />
                                        <label htmlFor="title">
                                            {state.new ? (
                                                <span>{state.title}</span>
                                            ) : (
                                                data.getTicketDataById[0]
                                                    .title || (
                                                    <span>No Title</span>
                                                )
                                            )}
                                        </label>
                                        <span
                                            className="helper-text"
                                            data-error="Please enter a title"
                                        ></span>
                                    </div>
                                </td>

                                <td>
                                    <form>
                                        <div className="input-field">
                                            <input
                                                type="text"
                                                id="desc"
                                                className="validate"
                                                value={state.description}
                                                onChange={e =>
                                                    setState({
                                                        ...state,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                            <label htmlFor="desc">
                                                {state.new ? (
                                                    <span>
                                                        {state.description}
                                                    </span>
                                                ) : (
                                                    data.getTicketDataById[0]
                                                        .description || (
                                                        <span>
                                                            No description
                                                        </span>
                                                    )
                                                )}
                                            </label>
                                            <span
                                                className="helper-text"
                                                data-error="Please enter a Description"
                                            ></span>
                                        </div>
                                    </form>
                                </td>
                            </tr>

                            <tr>
                                <th>ASSIGNED DEVELOPER</th>
                                <th>SUBMITTER</th>
                            </tr>

                            <tr>
                                <td>
                                    {user.role === "admin" ||
                                    user.role === "project-manager" ? (
                                        <span>
                                            <a
                                                className="dropdown-trigger btn manage-dropdown"
                                                href="#!"
                                                data-target="dropdowndev"
                                            >
                                                {state.developer !== "" ? (
                                                    <span>
                                                        {state.developer}
                                                    </span>
                                                ) : (
                                                    (
                                                        <span>
                                                            {
                                                                data
                                                                    .getTicketDataById[0]
                                                                    .developer
                                                            }
                                                        </span>
                                                    ) || <span>No Status</span>
                                                )}
                                            </a>
                                            <ul
                                                id="dropdowndev"
                                                className="dropdown-content"
                                            >
                                                {Users!.map((_val, i) => {
                                                    return (
                                                        <li key={i}>
                                                            <button
                                                                className="btnDropdown"
                                                                name={`${
                                                                    Users![i]
                                                                        .username
                                                                }`}
                                                                onClick={e =>
                                                                    setState({
                                                                        ...state,
                                                                        developer: Users![
                                                                            i
                                                                        ]
                                                                            .username,
                                                                    })
                                                                }
                                                            >
                                                                {
                                                                    Users![i]
                                                                        .username
                                                                }
                                                            </button>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </span>
                                    ) : (
                                        <span className="capitalize">
                                            {
                                                data.getTicketDataById[0]
                                                    .developer
                                            }
                                        </span>
                                    )}
                                </td>
                                <td>
                                    <span className="capitalize">
                                        {data.getTicketDataById[0].submitter}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <th>BELONGS TO PROJECT</th>
                                <th>TICKET PRIORITY</th>
                            </tr>

                            <tr>
                                {user.role === "developer" ? (
                                    <td>{data.getTicketDataById[0].title}</td>
                                ) : (
                                    <td>
                                        {/* eslint-disable-next-line */}
                                        <a
                                            className="dropdown-trigger btn manage-dropdown"
                                            data-target="dropdownassign"
                                        >
                                            {state.parentTitle === "" ? (
                                                // eslint-disable-next-line
                                                Projects.map((_val, i) => {
                                                    if (
                                                        `${
                                                            Projects![i]
                                                                .projectid
                                                        }` ===
                                                        `${data!
                                                            .getTicketDataById[0]
                                                            .belongsto!}`
                                                    ) {
                                                        return Projects![i]
                                                            .title;
                                                    }
                                                })
                                            ) : (
                                                <>{state.parentTitle}</>
                                            )}
                                        </a>
                                        <ul
                                            id="dropdownassign"
                                            className="dropdown-content"
                                        >
                                            {!!Projects.map
                                                ? Projects.map((_val, i) => {
                                                      return (
                                                          <li key={i}>
                                                              <button
                                                                  className="btnDropdown"
                                                                  onClick={() =>
                                                                      setState({
                                                                          ...state,
                                                                          projectid: `${Projects![
                                                                              i
                                                                          ]
                                                                              .projectid!}`,
                                                                          parentTitle: Projects![
                                                                              i
                                                                          ]
                                                                              .title!,
                                                                      })
                                                                  }
                                                              >
                                                                  {
                                                                      Projects![
                                                                          i
                                                                      ].title
                                                                  }
                                                              </button>
                                                          </li>
                                                      );
                                                  })
                                                : null}
                                        </ul>
                                    </td>
                                )}
                                <td>
                                    <a
                                        className="dropdown-trigger btn manage-dropdown"
                                        href="#!"
                                        data-target="dropdownpriority"
                                    >
                                        {state.priority !== "" ? (
                                            <span>{state.priority}</span>
                                        ) : (
                                            data.getTicketDataById[0]
                                                .priority || (
                                                <span>No Status</span>
                                            )
                                        )}
                                    </a>
                                    <ul
                                        id="dropdownpriority"
                                        className="dropdown-content"
                                    >
                                        <li>
                                            <button
                                                className="btnDropdown"
                                                onClick={() =>
                                                    setState({
                                                        ...state,
                                                        priority: "low",
                                                    })
                                                }
                                            >
                                                Low
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="btnDropdown"
                                                onClick={() =>
                                                    setState({
                                                        ...state,
                                                        priority: "medium",
                                                    })
                                                }
                                            >
                                                Medium
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="btnDropdown"
                                                onClick={() =>
                                                    setState({
                                                        ...state,
                                                        priority: "high",
                                                    })
                                                }
                                            >
                                                High
                                            </button>
                                        </li>
                                    </ul>
                                </td>
                            </tr>

                            <tr>
                                <th>TICKET STATUS</th>
                                <th>TICKET TYPE</th>
                            </tr>

                            <tr>
                                <td>
                                    <a
                                        className="dropdown-trigger btn manage-dropdown"
                                        href="#!"
                                        data-target="dropdownstatus"
                                    >
                                        {state.status !== "" ? (
                                            <span>{state.status}</span>
                                        ) : (
                                            data.getTicketDataById[0]
                                                .status || (
                                                <span>No Status</span>
                                            )
                                        )}
                                    </a>
                                    <ul
                                        id="dropdownstatus"
                                        className="dropdown-content"
                                    >
                                        <li>
                                            <button
                                                className="btnDropdown"
                                                onClick={() =>
                                                    setState({
                                                        ...state,
                                                        status: "open",
                                                    })
                                                }
                                            >
                                                Open
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="btnDropdown"
                                                name="closed"
                                                onClick={() =>
                                                    setState({
                                                        ...state,
                                                        status: "closed",
                                                    })
                                                }
                                            >
                                                Closed
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="btnDropdown"
                                                name="on-hold"
                                                onClick={() =>
                                                    setState({
                                                        ...state,
                                                        status: "on-hold",
                                                    })
                                                }
                                            >
                                                On Hold
                                            </button>
                                        </li>
                                    </ul>
                                </td>
                                <td>
                                    <a
                                        className="dropdown-trigger btn manage-dropdown"
                                        href="#!"
                                        data-target="dropdowntype"
                                    >
                                        {state.type !== "" ? (
                                            <span>{state.type}</span>
                                        ) : (
                                            data.getTicketDataById[0].type || (
                                                <span>No Type</span>
                                            )
                                        )}
                                    </a>
                                    <ul
                                        id="dropdowntype"
                                        className="dropdown-content"
                                    >
                                        <li>
                                            <button
                                                className="btnDropdown"
                                                onClick={() =>
                                                    setState({
                                                        ...state,
                                                        type: "bugs/errors",
                                                    })
                                                }
                                            >
                                                Bugs/Errors
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="btnDropdown"
                                                onClick={() =>
                                                    setState({
                                                        ...state,
                                                        type: "features",
                                                    })
                                                }
                                            >
                                                Features
                                            </button>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="divider"></div>
                    <div className="row">
                        <button
                            id="backBtn"
                            className="btn left footerBtn"
                            onClick={() => history.goBack()}
                        >
                            Back
                        </button>
                        <button
                            id="deleteBtn"
                            className="btn center danger-btn modal-trigger"
                            data-target="modal1"
                        >
                            DELETE
                        </button>
                        <button
                            id="submitBtn"
                            className="btn right safe-btn"
                            onClick={() => updateTicket()}
                        >
                            Submit
                        </button>
                    </div>
                </span>

                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4>
                            ARE YOU SURE YOU WANT TO DELETE TICKET #{ticketid}
                        </h4>
                        <p>This action cannot be undone</p>
                    </div>
                    <div className="modal-footer">
                        <button className="modal-close waves-effect waves-green btn-flat">
                            CANCEL
                        </button>
                        <button
                            className="modal-close red white-text waves-effect waves-red btn-flat"
                            onClick={() => deleteTicket()}
                        >
                            DELETE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
