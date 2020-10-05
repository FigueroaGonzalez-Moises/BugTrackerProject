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
} from "../../../generated/graphql";
import { useHistory, Redirect } from "react-router-dom";
import M from "materialize-css";
import { DevSub } from "./DevSub";
import { AssignProject } from "./AssignProject";
import { GetLocation } from "../../GetLocation";
import { useSelector } from "react-redux";
import { State, User } from "../../../redux/RootReducer";
import { JsFooterStyling } from "../../../css/JsStyling";

export const EditTicket: React.FC = () => {
    const history: any = useHistory();
    let id = GetLocation();
    // eslint-disable-next-line
    var parentid = eval(id);
    const { data, loading } = useGetTicketDataByIdQuery({
        variables: { id: `${id}` },
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
    const [DeleteThisTicket] = useDeleteTicketMutation();
    const [addHistory] = useAddTicketHistoryMutation();
    const [state, setState] = useState({
        status: "",
        type: "",
        title: "",
        description: "",
        priority: "",
        new: false,
    });

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

    if (loading || !data) {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        );
    }

    if (data.getTicketDataById.length === 0) {
        return <Redirect to="#/manage-projects" />;
    }

    const setTicketStatus = async (e: React.SyntheticEvent) => {
        let target = e.target as HTMLButtonElement;
        let status = target.name;
        let oldValue: string = data.getTicketDataById[0].status!;
        setState({ ...state, status });
        let tmp = await setStatus({
            variables: {
                ticketid: `${id}`,
                status: `${status}`,
            },
        });
        if (tmp) {
            M.toast({ html: "Ticket Status successfully changed" });
            addHistory({
                variables: {
                    propertyChanged: "TicketStatus",
                    oldValue,
                    parentid,
                    newValue: status,
                },
            });
        } else {
            M.toast({ html: "Failed! Server is most likely down" });
        }
    };

    const setTicketType = async (e: React.SyntheticEvent) => {
        let target = e.target as HTMLButtonElement;
        let type = target.name;
        let oldValue: string = data.getTicketDataById[0].type!;
        setState({ ...state, type });
        let tmp = await setType({
            variables: {
                ticketid: `${id}`,
                type: `${type}`,
            },
        });
        if (tmp) {
            M.toast({ html: "Ticket Type successfully changed" });
            addHistory({
                variables: {
                    propertyChanged: "TicketType",
                    oldValue,
                    parentid,
                    newValue: type,
                },
            });
        } else {
            M.toast({ html: "Failed! Server is most likely down" });
        }
    };

    const setTicketPriority = async (e: React.SyntheticEvent) => {
        let target = e.target as HTMLButtonElement;
        let priority = target.name;
        let oldValue: string = data.getTicketDataById[0].priority!;
        setState({ ...state, priority });
        let tmp = await setPriority({
            variables: {
                ticketid: `${id}`,
                priority: `${priority}`,
            },
        });
        if (tmp) {
            M.toast({ html: "Ticket Priority successfully changed" });
            addHistory({
                variables: {
                    propertyChanged: "TicketPriority",
                    oldValue,
                    parentid,
                    newValue: priority,
                },
            });
        } else {
            M.toast({ html: "Failed! Server is most likely down" });
        }
    };

    const updateTicket = async () => {
        if (state.title === "" && state.description === "") {
            if (state.title === "") {
                document.getElementById("title")!.classList.add("invalid");
            }

            if (state.description === "") {
                document.getElementById("desc")!.classList.add("invalid");
            }

            M.toast({ html: "Not Enough Data Provided" });
        } else {
            let oldValue: string = data.getTicketDataById[0].title!;
            setState({ ...state, new: true });
            if (state.title !== "") {
                let tmp = await setTitle({
                    variables: {
                        ticketid: `${id}`,
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

            if (state.description !== "") {
                let tmp = await setDesc({
                    variables: {
                        ticketid: `${id}`,
                        desc: `${state.description}`,
                    },
                });
                if (tmp) {
                    M.toast({
                        html: "Ticket Description successfully changed",
                    });
                } else {
                    M.toast({ html: "Failed! Server is most likely down" });
                }
            }
            window.location.reload();
        }
    };

    const deleteTicket = async () => {
        await DeleteThisTicket({
            variables: {
                ticketid: `${id}`,
            },
        });
        window.location.replace("#/dashboard");
    };

    return (
        <div className="container">
            <div className="center-align table-wrapper">
                <span className="table-header z-depth-2">
                    <h2 className="white-text noselect">Edit Ticket #{id}</h2>
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

                            <DevSub
                                developer={`${data.getTicketDataById[0].developer}`}
                                submitter={`${data.getTicketDataById[0].submitter}`}
                            />

                            <tr>
                                <th>BELONGS TO PROJECT</th>
                                <th>TICKET PRIORITY</th>
                            </tr>

                            <tr>
                                {user.role === "developer" ? (
                                    <td>{data.getTicketDataById[0].title}</td>
                                ) : (
                                    <AssignProject
                                        title={`${data.getTicketDataById[0].title}`}
                                        id={id}
                                    />
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
                                                name="low"
                                                onClick={e =>
                                                    setTicketPriority(e)
                                                }
                                            >
                                                Low
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="btnDropdown"
                                                name="medium"
                                                onClick={e =>
                                                    setTicketPriority(e)
                                                }
                                            >
                                                Medium
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="btnDropdown"
                                                name="high"
                                                onClick={e =>
                                                    setTicketPriority(e)
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
                                                name="open"
                                                onClick={e =>
                                                    setTicketStatus(e)
                                                }
                                            >
                                                Open
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="btnDropdown"
                                                name="closed"
                                                onClick={e =>
                                                    setTicketStatus(e)
                                                }
                                            >
                                                Closed
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="btnDropdown"
                                                name="on-hold"
                                                onClick={e =>
                                                    setTicketStatus(e)
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
                                                name="bugs/errors"
                                                onClick={e => setTicketType(e)}
                                            >
                                                Bugs/Errors
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                className="btnDropdown"
                                                name="features"
                                                onClick={e => setTicketType(e)}
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
                        <h4>ARE YOU SURE YOU WANT TO DELETE TICKET #{id}</h4>
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
