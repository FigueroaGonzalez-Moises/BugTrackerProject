import React, { useEffect, useState } from "react";
import { TicDetailsSubCom } from "./TicDetailsSubCom";
import { useGetUserTicketsQuery } from "../../generated/graphql";

export const Tickets: React.FC = () => {
    const { data, loading } = useGetUserTicketsQuery();
    // eslint-disable-next-line
    const [state, setState] = useState({});

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

    const sortTicketsByPriority = () => {
        let arr = data.getUserTickets;
        let t = false;
        for (let i = 0; i < arr.length; i++) {
            let j = i;
            while (
                j > 0 &&
                ((arr[j].priority === "high" &&
                    (arr[j - 1].priority === "medium" ||
                        arr[j - 1].priority === "low")) ||
                    (arr[j].priority === "medium" &&
                        arr[j - 1].priority === "low"))
            ) {
                let tmp = arr.slice(j - 1, j + 1);
                tmp.reverse();
                arr[j - 1] = tmp[0];
                arr[j] = tmp[1];
                j = j - 1;
                t = true;
            }
        }
        if (!t && !!arr) {
            arr.reverse();
        }
        setState({ arr });
    };

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
                                <th>Project Title</th>
                                <th className="nonessen">Developer Assigned</th>
                                <th className="nonessen">
                                    Ticket Priority
                                    <i
                                        className="material-icons noselect"
                                        onClick={() => sortTicketsByPriority()}
                                    >
                                        swap_vert
                                    </i>
                                </th>
                                <th>Ticket Status</th>
                                <th className="nonessen">Ticket Type</th>
                            </tr>
                        </thead>

                        <tbody>
                            {!!data.getUserTickets.map ? (
                                data.getUserTickets.map((_val, i) => {
                                    return (
                                        <TicDetailsSubCom
                                            key={i}
                                            UserTickets={data.getUserTickets}
                                            i={i}
                                        />
                                    );
                                })
                            ) : (
                                <tr></tr>
                            )}
                        </tbody>
                    </table>
                </span>
            </div>
        </div>
    );
};
