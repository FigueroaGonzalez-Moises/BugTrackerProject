import React from "react";
import { useGetProjectTicketsQuery } from "../../../generated/graphql";
import { GetLocation } from "../../GetLocation";

export const EditPTTable: React.FC = () => {
    let id = GetLocation();
    const { data, loading } = useGetProjectTicketsQuery({
        variables: {
            id: `${id}`,
        },
    });

    if (loading) {
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
            {!!data ? (
                data!.getProjectTickets.map((_val, i, getProjectTickets) => {
                    return (
                        <tr key={i}>
                            <td className="capitalize">
                                {getProjectTickets[i].title}
                            </td>
                            <td className="capitalize">
                                {getProjectTickets[i].submitter}
                            </td>
                            <td className="capitalize">
                                {getProjectTickets[i].developer}
                            </td>
                            <td className="capitalize">
                                {getProjectTickets[i].status}
                            </td>
                            <td>
                                <a
                                    href={`#/edit-ticket:${getProjectTickets[i].ticketid}`}
                                >
                                    EDIT
                                </a>
                            </td>
                        </tr>
                    );
                })
            ) : (
                <tr></tr>
            )}
            <tr>
                <td>
                    <a href={`#/project-add:${id}`}>
                        <button className="btn safe-btn white-text w-100">
                            Add Ticket
                        </button>
                    </a>
                </td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    );
};
