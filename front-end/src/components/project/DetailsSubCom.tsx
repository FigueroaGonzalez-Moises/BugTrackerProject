import React from "react";
import { useGetProjectDataByIdQuery } from "../../generated/graphql";

interface Props {
    projectid: number,
    keyprop: number,
}

export const DetailsSubCom: React.FC<Props> = (props) => {
    const { data, loading } = useGetProjectDataByIdQuery({ variables: { projectid: `${props.projectid}` }});

    if (loading || !data) {
        return(
            <tr><td>
                <div className = "progress">
                    <div className = "indeterminate"></div>
                </div>
            </td></tr>
        );
    }

    return(
        <tr key = {props.keyprop}>
            <td>
                { data.getProjectDataById[0].title }
            </td>

            <td className = "nonessen">
                { data.getProjectDataById[0].description }
            </td>

            <td>
                <a href = {`#/project-details:${props.projectid}`}>Details</a>
            </td>
        </tr>
    );
}