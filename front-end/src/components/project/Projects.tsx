import React, { useEffect } from "react";
import { useGetUserProjectsQuery } from "../../generated/graphql";
import { DetailsSubCom } from "./DetailsSubCom";

export const Projects: React.FC = () => {
    const { data, loading } = useGetUserProjectsQuery();

    useEffect(() => {
        var elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);
    })

    if (loading || !data) {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="center-align table-wrapper">
                <span className="table-header z-depth-2">
                    <h2 className="white-text">My Projects</h2>
                </span>

                <span className="table-body z-depth-1">
                    <table className="">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th className="nonessen">Description</th>
                            </tr>
                        </thead>

                        <tbody>
                            {!!data!.getUserProjects!.map ? data!.getUserProjects!.map((_val, i, getUserProjects): JSX.Element => {
                                return (
                                    <DetailsSubCom projectid={getUserProjects[i].projectid} key={i} keyprop={i} />
                                );
                            })
                                :
                                <tr></tr>}
                        </tbody>
                    </table>
                </span>
            </div>
        </div>
    );
}