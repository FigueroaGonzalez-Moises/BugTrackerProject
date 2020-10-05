import * as React from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useGetTicketDataByIdQuery } from "../../generated/graphql";
import { GetLocation } from "../GetLocation";
import { useEffect } from "react";
import TicketComments from "./TicketComments";
import TicketHistory from "./TicketHistory";

export const TicketDetails: React.FC = () => {
    const history = useHistory();
    let id = GetLocation();
    const { data, loading } = useGetTicketDataByIdQuery({
        variables: { id: `${id}` },
    });

    useEffect(() => {
        var elems = document.querySelectorAll(".sidenav");
        M.Sidenav.init(elems);
    });

    if (loading) {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        );
    }

    if (!data) {
        return <span>no data</span>;
    }

    let ticket: any = data.getTicketDataById;

    return (
        <span>
            {ticket.length === 0 ? (
                <Redirect to="/dashboard" />
            ) : (
                <>
                    <div className="detailsWrapper container-fluid">
                        <div className="center-align table-wrapper">
                            <span className="table-header z-depth-2">
                                <h2 className="white-text noselect">
                                    Details For Ticket #{id}
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
                                            <td className="capitalize">
                                                {ticket[0].title}
                                            </td>
                                            <td className="capitalize">
                                                {ticket[0].description ||
                                                    "NONE"}
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>ASSIGNED DEVELOPER</th>
                                            <th>SUBMITTER</th>
                                        </tr>

                                        <tr>
                                            <td className="capitalize">
                                                {ticket[0].developer}
                                            </td>
                                            <td className="capitalize">
                                                {ticket[0].submitter}
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>BELONGS TO PROJECT</th>
                                            <th>TICKET PRIORITY</th>
                                        </tr>

                                        <tr>
                                            <td>#{ticket[0].belongsto}</td>
                                            <td className="capitalize">
                                                {ticket[0].priority}
                                            </td>
                                        </tr>

                                        <tr>
                                            <th>TICKET STATUS</th>
                                            <th>TICKET TYPE</th>
                                        </tr>

                                        <tr>
                                            <td className="capitalize">
                                                {ticket[0].status}
                                            </td>
                                            <td className="capitalize">
                                                {ticket[0].type || "NONE"}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>

                                <div className="divider"></div>

                                <button
                                    className="btn left footerBtn"
                                    onClick={() => history.goBack()}
                                >
                                    Go Back
                                </button>
                                <a href={`#/edit-ticket:${id}`}>
                                    <button className="btn right footerBtn">
                                        Edit
                                    </button>
                                </a>
                            </span>
                        </div>
                    </div>

                    <TicketComments />
                    <TicketHistory />
                </>
            )}
        </span>
    );
};
