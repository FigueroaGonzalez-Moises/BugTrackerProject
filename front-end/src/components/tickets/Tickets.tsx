import React, { useEffect, useState } from "react";
import { useGetUserTicketsQuery } from "../../generated/graphql";
import { Sorting } from "../Sorting";

export const Tickets: React.FC = () => {
    const { data, loading } = useGetUserTicketsQuery();
    const {
        pagination,
        sortByTitle,
        sortTicketsByPriority,
        sortTicketsByStatus,
        sortTicketsByType,
    } = Sorting();

    const [state, setState] = useState({
        arr: [] as any,
        toggle: "0",
        toggle2: "0",
        paginationLower: "0",
        paginationUpper: "1",
        rows: "4",
        titleSwitch: "0",
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

    // eslint-disable-next-line
    let pages = eval(`(${data.getUserTickets.length}/${state.rows}) - 1`);
    let pagesArr = [] as number[];
    for (let i = 0; i < pages; i++) {
        pagesArr.push(i);
    }

    return (
        <div className="container">
            <div className="center-align table-wrapper">
                <span className="table-header z-depth-2">
                    <h2 className="white-text">Your Tickets</h2>
                </span>

                <span className="table-body z-depth-1">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Project Title
                                    <i
                                        className="material-icons noselect"
                                        onClick={() => {
                                            let titleSwitch = sortByTitle(
                                                data.getUserTickets,
                                                state.titleSwitch
                                            );
                                            setState({ ...state, titleSwitch });
                                        }}
                                    >
                                        swap_vert
                                    </i>
                                </th>
                                <th className="nonessen">
                                    Ticket Priority
                                    <i
                                        className="material-icons noselect"
                                        onClick={() => {
                                            let toggle2: string =
                                                sortTicketsByPriority(
                                                    data.getUserTickets,
                                                    state.toggle2
                                                ) || "0";
                                            setState({ ...state, toggle2 });
                                        }}
                                    >
                                        swap_vert
                                    </i>
                                </th>
                                <th>
                                    Ticket Status
                                    <i
                                        className="material-icons noselect"
                                        onClick={() => {
                                            let toggle: string =
                                                sortTicketsByStatus(
                                                    data.getUserTickets,
                                                    state.toggle
                                                ) || "0";
                                            setState({ ...state, toggle });
                                        }}
                                    >
                                        swap_vert
                                    </i>
                                </th>
                                <th className="nonessen">
                                    Ticket Type
                                    <i
                                        className="material-icons noselect"
                                        onClick={() => {
                                            let arr: any = sortTicketsByType(
                                                data.getUserTickets
                                            );
                                            setState({ ...state, arr });
                                        }}
                                    >
                                        swap_vert
                                    </i>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {!!data.getUserTickets.map ? (
                                data.getUserTickets.map((_val, i) => {
                                    if (
                                        i >=
                                            // eslint-disable-next-line
                                            eval(
                                                `${state.paginationLower}*${state.rows}`
                                            ) &&
                                        i <
                                            // eslint-disable-next-line
                                            eval(
                                                `${state.paginationUpper}*${state.rows}`
                                            )
                                    ) {
                                        return (
                                            <tr key={i}>
                                                <td className="capitalize">
                                                    {
                                                        data.getUserTickets[i]
                                                            .title
                                                    }
                                                </td>
                                                <td className="nonessen capitalize">
                                                    {
                                                        data.getUserTickets[i]
                                                            .priority
                                                    }
                                                </td>
                                                <td className="capitalize">
                                                    {
                                                        data.getUserTickets[i]
                                                            .status
                                                    }
                                                </td>
                                                <td className="nonessen capitalize">
                                                    {
                                                        data.getUserTickets[i]
                                                            .type
                                                    }
                                                </td>
                                                <td className="noselect capitalize">
                                                    <a
                                                        href={`#/ticket-details:${data.getUserTickets[i].ticketid}`}
                                                    >
                                                        Details
                                                    </a>
                                                </td>
                                            </tr>
                                        );
                                    } else {
                                        return null;
                                    }
                                })
                            ) : (
                                <tr></tr>
                            )}
                        </tbody>
                    </table>
                    Page Limit:
                    <input
                        className="browser-default pagination-input"
                        id="email_inline"
                        type="number"
                        min="1"
                        max="100"
                        value={state.rows}
                        onChange={e => {
                            setState({ ...state, rows: e.target.value });
                        }}
                    />
                    <ul className="pagination noselect">
                        <li key={1} className="active pag-active" id={`${1}li`}>
                            {/* eslint-disable-next-line */}
                            <a
                                id={`1`}
                                onClick={e => {
                                    let id: string = pagination(e);
                                    setState({
                                        ...state,
                                        // eslint-disable-next-line
                                        paginationLower: eval(`${id} - 1`),
                                        paginationUpper: id,
                                    });
                                }}
                            >
                                {1}
                            </a>
                        </li>
                        {pagesArr.map((_val, i) => {
                            return (
                                <li key={i + 2} id={`${i + 2}li`}>
                                    {/* eslint-disable-next-line */}
                                    <a
                                        id={`${i + 2}`}
                                        onClick={e => {
                                            let id: string = pagination(e);
                                            setState({
                                                ...state,
                                                // eslint-disable-next-line
                                                paginationLower: eval(
                                                    `${id} - 1`
                                                ),
                                                paginationUpper: id,
                                            });
                                        }}
                                    >
                                        {i + 2}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </span>
            </div>
        </div>
    );
};
