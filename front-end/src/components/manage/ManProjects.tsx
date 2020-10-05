import React, { useEffect } from "react";
import { useGetProjectDataQuery } from "../../generated/graphql";

export const ManageProjects: React.FC = () => {
    const { data , loading } = useGetProjectDataQuery();

    useEffect( () => {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);
    })
    
    if(loading || !data) {
        return(
            <div className = "progress">
                <div className = "indeterminate"></div>
            </div>
        );
    }

    return(
        <div className = "container">
            <div className = "center-align table-wrapper">
                <span className = "table-header z-depth-2">
                    <h2 className = "white-text noselect">Manage Projects</h2>
                </span>

                <span className = "table-body z-depth-1">
                    <table className = "">
                        <thead>
                            <tr>
                                <th><b>Project Name</b></th>
                                <th className = "nonessen"><b>Description</b></th>
                                <th><b>Users Assigned</b></th>
                                <th className = "noselect"><b>Edit/Details</b></th>
                            </tr>
                        </thead>

                        <tbody>
                            { !!data.getProjectData.map ? data.getProjectData.map( (_val, i, getProjectData) => {
                                let projectId = getProjectData[i].projectid;
                                return(
                                    <tr key = {i}>
                                        <td> { getProjectData[i].title } </td>
                                        <td className = "nonessen"> { getProjectData[i].description } </td>
                                        <td> { getProjectData[i].projectid } </td>
                                        <td> <a href = { `#/edit-project:${projectId}`}>
                                                <i className = "material-icons blue-grey-text text-darken-4 noselect">edit</i>
                                            </a> 
                                            <br /> 
                                            <a href = {`#/project-details:${projectId}`}>
                                                <i className = "material-icons blue-grey-text text-darken-4 noselect">details</i>
                                            </a>
                                        </td> 
                                    </tr>
                                );
                            })
                            :
                                <tr></tr>
                            }
                        </tbody>
                    </table>
                    <div className = "poormans-divider"></div>
                    <a href = "#/create-project"><button className = "btn btn-ex safe-btn center footerBtn">Add Project</button></a>
                </span>
            </div>
        </div>
    );
}