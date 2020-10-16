import React, { useState, useEffect } from "react";
import { useGetUsersQuery } from "../../../generated/graphql";
import { RoleMethods } from "./RoleMethods";
import { Sorting } from "../../Sorting";

export const ManageRoles: React.FC = () => {
    const { data, loading } = useGetUsersQuery();
    const { deleteUser, pagination, setRole } = RoleMethods();
    const {
        usernameSort,
        emailSort,
        roleSort,
        firstnameSort,
        lastnameSort,
    } = Sorting();

    const [state, setState] = useState({
        paginationLower: "0",
        paginationUpper: "1",
        rows: "2",
        roleSwitch: "0",
        emailSwitch: "0",
        usernameSwitch: "0",
        fnameSwitch: "0",
        lnameSwitch: "0",
    });

    useEffect(() => {
        var elems = document.querySelectorAll(".sidenav");
        M.Sidenav.init(elems);
    });

    if (loading || !data) {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        );
    }

    // eslint-disable-next-line
    let pages = eval(`(${data.getUsers!.length}/${state.rows}) - 1`);
    let pagesArr = [] as number[];
    for (let i = 0; i < pages; i++) {
        pagesArr.push(i);
    }

    return (
        <div className="container">
            <div className="center-align table-wrapper table-mb">
                <span className="table-header z-depth-2">
                    <h2 className="white-text">Manage Roles</h2>
                </span>

                <span className="table-body z-depth-1">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    UserName
                                    <i
                                        className="material-icons noselect"
                                        onClick={() => {
                                            let usernameSwitch: string =
                                                usernameSort(
                                                    data.getUsers,
                                                    state.usernameSwitch
                                                ) || "0";
                                            setState({
                                                ...state,
                                                usernameSwitch,
                                            });
                                        }}
                                    >
                                        swap_vert
                                    </i>
                                </th>
                                <th className="nonessen">
                                    Email
                                    <i
                                        className="material-icons noselect"
                                        onClick={() => {
                                            let emailSwitch: string =
                                                emailSort(
                                                    data.getUsers,
                                                    state.emailSwitch
                                                ) || "0";
                                            setState({ ...state, emailSwitch });
                                        }}
                                    >
                                        swap_vert
                                    </i>
                                </th>
                                <th>
                                    Role
                                    <i
                                        className="material-icons noselect"
                                        onClick={() => {
                                            let roleSwitch: string =
                                                roleSort(
                                                    data.getUsers,
                                                    state.roleSwitch
                                                ) || "0";
                                            setState({
                                                ...state,
                                                roleSwitch,
                                            });
                                        }}
                                    >
                                        swap_vert
                                    </i>
                                </th>
                                <th className="nonessen">
                                    First Name
                                    <i
                                        className="material-icons noselect"
                                        onClick={() => {
                                            let fnameSwitch: string =
                                                firstnameSort(
                                                    data.getUsers,
                                                    state.fnameSwitch
                                                ) || "0";
                                            setState({ ...state, fnameSwitch });
                                        }}
                                    >
                                        swap_vert
                                    </i>
                                </th>
                                <th className="nonessen">
                                    Last Name
                                    <i
                                        className="material-icons noselect"
                                        onClick={() => {
                                            let lnameSwitch: string =
                                                lastnameSort(
                                                    data.getUsers,
                                                    state.lnameSwitch
                                                ) || "0";
                                            setState({ ...state, lnameSwitch });
                                        }}
                                    >
                                        swap_vert
                                    </i>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {!!data!.getUsers!.map ? (
                                data!.getUsers!.map((_val, i: number) => {
                                    if (
                                        i >=
                                            // eslint-disable-next-line
                                            eval(
                                                `${state.paginationLower}*${state.rows}`
                                            ) &&
                                        i <
                                            // eslint-disable-next-line
                                            eval(
                                                `${state.paginationUpper}*${state.rows}`
                                            )
                                    ) {
                                        return (
                                            <tr key={i}>
                                                <td className="capitalize">
                                                    {!!data.getUsers![i]
                                                        .username
                                                        ? data.getUsers![i]
                                                              .username
                                                        : null}
                                                </td>
                                                <td className="nonessen capitalize">
                                                    {!!data!.getUsers![i].email
                                                        ? data!.getUsers![i]
                                                              .email
                                                        : null}
                                                </td>
                                                <td>
                                                    <div className="input-field col s12">
                                                        <select className="browser-default capitalize">
                                                            <option
                                                                value=""
                                                                className="capitalize"
                                                                disabled
                                                                selected
                                                            >
                                                                {
                                                                    data!
                                                                        .getUsers![
                                                                        i
                                                                    ].role
                                                                }
                                                            </option>
                                                            <option
                                                                value={`admin`}
                                                                onClick={e => {
                                                                    setRole(
                                                                        e,
                                                                        i,
                                                                        data
                                                                    );
                                                                }}
                                                            >
                                                                Admin
                                                            </option>
                                                            <option
                                                                value={`developer`}
                                                                onClick={e => {
                                                                    setRole(
                                                                        e,
                                                                        i,
                                                                        data
                                                                    );
                                                                }}
                                                            >
                                                                Developer
                                                            </option>
                                                            <option
                                                                value={`project-manager`}
                                                                onClick={e => {
                                                                    setRole(
                                                                        e,
                                                                        i,
                                                                        data
                                                                    );
                                                                }}
                                                            >
                                                                Project-manager
                                                            </option>
                                                        </select>
                                                    </div>
                                                </td>
                                                <td className="nonessen capitalize">
                                                    {
                                                        data!.getUsers![i]
                                                            .firstname
                                                    }
                                                </td>
                                                <td className="nonessen capitalize">
                                                    {
                                                        data!.getUsers![i]
                                                            .lastname
                                                    }
                                                </td>
                                                <td>
                                                    <button
                                                        name={`${
                                                            data!.getUsers![i]
                                                                .id
                                                        }`}
                                                        onClick={e => {
                                                            deleteUser(e);
                                                        }}
                                                        className="btn red"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    } else {
                                        return null;
                                    }
                                })
                            ) : (
                                <tr></tr>
                            )}
                        </tbody>
                    </table>
                    Page Limit:
                    <input
                        className="browser-default pagination-input"
                        id="email_inline"
                        type="number"
                        min="1"
                        max="100"
                        value={state.rows}
                        onChange={e => {
                            setState({ ...state, rows: e.target.value });
                        }}
                    />
                    <ul className="pagination noselect">
                        <li key={1} className="active pag-active" id={`1li`}>
                            {/* eslint-disable-next-line */}
                            <a
                                id={`1`}
                                onClick={e => {
                                    let id: string = pagination(e);
                                    setState({
                                        ...state,
                                        // eslint-disable-next-line
                                        paginationLower: eval(`${id} - 1`),
                                        paginationUpper: id,
                                    });
                                }}
                            >
                                {1}
                            </a>
                        </li>
                        {pagesArr.map((_val, i) => {
                            return (
                                <li key={i + 2} id={`${i + 2}li`}>
                                    {/* eslint-disable-next-line */}
                                    <a
                                        id={`${i + 2}`}
                                        onClick={e => {
                                            let id: string = pagination(e);
                                            setState({
                                                ...state,
                                                // eslint-disable-next-line
                                                paginationLower: eval(
                                                    `${id} - 1`
                                                ),
                                                paginationUpper: id,
                                            });
                                        }}
                                    >
                                        {i + 2}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </span>
            </div>
        </div>
    );
};
