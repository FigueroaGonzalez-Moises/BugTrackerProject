import { useGetUsersQuery, useAddProjectUserMutation, useRemoveProjectUserMutation } from "../../../generated/graphql";
import React, { useState, useEffect } from "react";
import { CheckIfInProject } from "./CheckIfInProject";
import { GetLocation } from "../../GetLocation";

export const USERS = (projectUsers: any) => {
    const { data, loading } = useGetUsersQuery();
    const [addUser] = useAddProjectUserMutation();
    const [removeUser] = useRemoveProjectUserMutation();
    const PROJECT_ID = GetLocation();
    // eslint-disable-next-line
    const [state, setState] = useState({
        assigned: projectUsers,
    });

    useEffect( () => {
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    })

    if (loading || !data) {
        return (
            <td>
                <div className = "progress">
                    <div className = "indeterminate"></div>
                </div>
            </td>
        );
    }

    const modPersonnel = async (i: number) => {
        if(CheckIfInProject(data!.getUsers![i].id, projectUsers)) {
            await removeUser({ 
                variables: {
                    userid: `${data!.getUsers![i].id}`,
                    projectid: `${PROJECT_ID}`
                }
            });
            M.toast({html: `Removed ${data!.getUsers![i].username}`});
        } else {
            await addUser({ 
                variables: {
                    projectid: `${PROJECT_ID}`,
                    userid: `${data!.getUsers![i].id}`
                }
            });
            M.toast({html: `Added ${data!.getUsers![i].username}`});
        }

        window.location.reload();
    }

    return (
        <td>
            <div className="input-field col s12">
                <select className = "browser-default">
                    <option value="" disabled selected>Click to add/remove</option>
                    { data!.getUsers!.map( ( _val, i, getUsers ) => {
                        return(
                            <option key={ i } onClick = { () => { modPersonnel(i) } }>  { getUsers[i].username } </option>
                        );
                    })}
                </select>
            </div>
        </td>
    );
}