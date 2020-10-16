import React, { useState } from "react";
import { useGetProjectTicketsQuery } from "../../generated/graphql";
import { GetLocation } from "../GetLocation";

export const ProjectTickets: React.FC = () => {
    let id = GetLocation();
    const { data, loading } = useGetProjectTicketsQuery({
        variables: { id: `${id}` },
    });

    if (loading || !data) {
        return (
            <tbody>
                <tr>
                    <td>
                        <div className="progress">
                            <div className="indeterminate"></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        );
    }

    return (
        <tbody>
            {data!.getProjectTickets!.map(
                (_val, i, getProjectTickets): JSX.Element => {
                    return (
                        <tr key={i}>
                            <td className="capitalize">
                                {getProjectTickets[i].title}
                            </td>
                            <td className="capitalize nonessen">
                                {getProjectTickets[i].submitter}
                            </td>
                            <td className="capitalize nonessen">
                                {getProjectTickets[i].developer}
                            </td>
                            <td className="capitalize">
                                {getProjectTickets[i].status}
                            </td>
                            <td>
                                <a
                                    className="noselect"
                                    href={`#/ticket-details:${getProjectTickets[i].ticketid}`}
                                >
                                    Details
                                </a>
                            </td>
                        </tr>
                    );
                }
            )}
        </tbody>
    );
};
