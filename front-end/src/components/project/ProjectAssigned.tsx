import React from "react";
import { useGetProjectUsersByIdQuery } from "../../generated/graphql";
import { GetLocation } from "../GetLocation";

export const ProjectAssigned: React.FC = () => {
    let id = GetLocation();
    const { data , loading } = useGetProjectUsersByIdQuery({ variables: { projectid: `${id}` }});

    if(loading || !data) {
        return(
            <tbody>
                <tr>
                    <td>
                        <div className = "progress">
                            <div className = "indeterminate"></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        )
    }

    return(
        <tbody>
            { data!.getProjectUsersById!.map( (_val, i, getProjectUsersById): JSX.Element => { 

            return (
                <tr key = {i}>
                    <td className = "capitalize nonessen"> { getProjectUsersById[i].username } </td> 
                    <td className = "capitalize nonessen"> { getProjectUsersById[i].email } </td> 
                    <td className = "capitalize"> { getProjectUsersById[i].role } </td> 
                </tr>
            );
            })}
        </tbody>
    );
}