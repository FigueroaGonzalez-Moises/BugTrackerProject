import React, { useEffect } from "react";
import { useGetProjectUsersByIdQuery } from "../../../generated/graphql";
import { USERS } from "./UserSelect";
import { GetLocation } from "../../GetLocation";



export const EditAss: React.FC = () => {
    const id = GetLocation();
    const { data, loading } = useGetProjectUsersByIdQuery({ variables: { projectid: `${id}` } });

    useEffect(() => {
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems);
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
        )
    }

    return (
        <tbody>
            {data!.getProjectUsersById!.map((_val, i, getProjectUsersById): JSX.Element => {

                return (
                    <tr key={i}>
                        <td className="capitalize"> {getProjectUsersById[i].username} </td>
                        <td className="capitalize"> {getProjectUsersById[i].email} </td>
                        <td className="capitalize"> {getProjectUsersById[i].role} </td>
                    </tr>
                );
            })}

            <tr>
                <USERS projectUsers={data.getProjectUsersById} />
            </tr>
        </tbody>
    );
}