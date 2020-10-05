import React, { useState, useEffect } from "react";
import {
    useGetUsersQuery,
    useSetTicketDeveloperMutation,
} from "../../../generated/graphql";
import { useSelector } from "react-redux";
import { State, User } from "../../../redux/RootReducer";
import { GetLocation } from "../../GetLocation";

interface Props {
    developer: string;
    submitter: string;
}

export const DevSub: React.FC<Props> = props => {
    let id = GetLocation();
    let developer = props.developer;
    let submitter = props.submitter;
    const [setDeveloper] = useSetTicketDeveloperMutation();
    const [state, setState] = useState({
        dev: "",
    });
    const user = useSelector<State, User>(
        state =>
            state.user || {
                id: 0,
                email: "",
                role: "",
                username: "",
                firstname: "",
                lastname: "",
            }
    );

    useEffect(() => {
        var elems = document.querySelectorAll(".dropdown-trigger");
        M.Dropdown.init(elems);
    });
    const { data, loading } = useGetUsersQuery();

    if (loading || !data) {
        return (
            <tr>
                <td>
                    <div className="progress">
                        <div className="indeterminate"></div>
                    </div>
                </td>
            </tr>
        );
    }
    const setDev = async (e: React.SyntheticEvent) => {
        if (user.role === "admin" || user.role === "project-manager") {
            let target = e.target as HTMLButtonElement;
            let dev = target.name;
            setState({ ...state, dev });
            let tmp = await setDeveloper({
                variables: {
                    ticketid: `${id}`,
                    developer: `${dev}`,
                },
            });
            if (tmp) {
                M.toast({ html: "Ticket Developer successfully changed" });
            }
        }
    };

    return (
        <tr>
            <td>
                {user.role === "admin" || user.role === "project-manager" ? (
                    <span>
                        <a
                            className="dropdown-trigger btn manage-dropdown"
                            href="#!"
                            data-target="dropdowndev"
                        >
                            {state.dev !== "" ? (
                                <span>{state.dev}</span>
                            ) : (
                                <span>{developer}</span> || (
                                    <span>No Status</span>
                                )
                            )}
                        </a>
                        <ul id="dropdowndev" className="dropdown-content">
                            {data!.getUsers!.map((_val, i, getUsers) => {
                                return (
                                    <li key={i}>
                                        <button
                                            className="btnDropdown"
                                            name={`${getUsers[i].username}`}
                                            onClick={e => setDev(e)}
                                        >
                                            {getUsers[i].username}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </span>
                ) : (
                    <span>{developer}</span>
                )}
            </td>
            <td>
                <span>{submitter}</span>
            </td>
        </tr>
    );
};
