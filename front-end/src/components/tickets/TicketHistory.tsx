import React from "react";
import { useGetHistoryQuery } from "../../generated/graphql";
import { GetLocation } from "../GetLocation";

const TicketHistory = () => {
    // eslint-disable-next-line
    let parentid: number = eval(GetLocation());
    const { data, loading } = useGetHistoryQuery({ variables: { parentid } });

    if (loading) {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        );
    }

    console.log("data :>> ", data);

    return (
        <>
            <div className="detailsWrapper container-fluid">
                <div className="center-align table-wrapper">
                    <span className="table-header z-depth-2">
                        <h2 className="white-text noselect">
                            History for Ticket #{parentid}
                        </h2>
                    </span>
                    <span className="table-body z-depth-1">
                        <table className="striped responsive">
                            <tbody>
                                <tr>
                                    <th>Property</th>
                                    <th>Old Value</th>
                                    <th>New Value</th>
                                    <th>Date Changed</th>
                                </tr>

                                {!data || !data.getHistory.map ? (
                                    <tr></tr>
                                ) : (
                                    data.getHistory.map((_val, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className="capitalize">
                                                    {
                                                        data.getHistory[i]
                                                            .propertyChanged
                                                    }
                                                </td>
                                                <td className="capitalize">
                                                    {
                                                        data.getHistory[i]
                                                            .oldValue
                                                    }
                                                </td>
                                                <td className="capitalize">
                                                    {
                                                        data.getHistory[i]
                                                            .newValue
                                                    }
                                                </td>
                                                <td className="capitalize">
                                                    {
                                                        data.getHistory[i]
                                                            .dateChanged
                                                    }
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </span>
                </div>
            </div>
        </>
    );
};

export default TicketHistory;
