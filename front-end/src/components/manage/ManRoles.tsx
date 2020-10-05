import React, { useState, useEffect } from "react";
import {
    useGetUsersQuery,
    useUpdateRoleMutation,
    useDeleteUserMutation,
} from "../../generated/graphql";

export const ManageRoles: React.FC = () => {
    const { data, loading } = useGetUsersQuery();
    const [updateRole] = useUpdateRoleMutation();
    const [DELETEUSER] = useDeleteUserMutation();
    const [state, setState] = useState({
        paginationLower: "1",
        paginationUpper: "1",
        limit: "4",
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

    const setRole = async (e: React.SyntheticEvent, i: any) => {
        let target = e.target as any;
        let role = target.value;
        let id = `${data.getUsers![i].id}`;
        if (!id || !role) {
        } else {
            await updateRole({
                variables: {
                    role,
                    id,
                },
            });

            window.location.reload();
        }
    };

    const pagination = (e: React.SyntheticEvent) => {
        let target = e.target as any;
        let id = target.id;
        const els = document.getElementsByClassName("pag-active");
        for (const el of (els as unknown) as any[]) {
            el.classList.remove("active");
            el.classList.remove("pag-active");
        }
        if (!!document.getElementById(`${id}li`)) {
            document.getElementById(`${id}li`)!.classList.add("active");
            document.getElementById(`${id}li`)!.classList.add("pag-active");
        }
        setState({ ...state, paginationLower: id, paginationUpper: id });
    };

    const deleteUser = async (e: React.SyntheticEvent) => {
        let target = e.target as HTMLButtonElement;
        let userid = target.name;
        let tmp = await DELETEUSER({
            variables: {
                userid,
            },
        });
        if (tmp) {
            window.location.reload();
        } else {
            M.toast({ html: "Error occurred while deleting user" });
        }
    };

    return (
        <div className="container">
            <div className="center-align table-wrapper">
                <span className="table-header z-depth-2">
                    <h2 className="white-text">Manage Roles</h2>
                </span>

                <span className="table-body z-depth-1">
                    <table>
                        <thead>
                            <tr>
                                <th>UserName</th>
                                <th className="nonessen">Email</th>
                                <th>Role</th>
                                <th className="nonessen">First Name</th>
                                <th className="nonessen">Last Name</th>
                            </tr>
                        </thead>

                        <tbody>
                            {data!.getUsers!.map((_val, i: number) => {
                                if (
                                    // eslint-disable-next-line
                                    eval(
                                        `(${state.paginationLower} - 1) *${state.limit}`
                                    ) < i &&
                                    i <=
                                        // eslint-disable-next-line
                                        eval(
                                            `${state.paginationUpper}*${state.limit}`
                                        )
                                ) {
                                    return (
                                        <tr key={i}>
                                            <td>
                                                {data!.getUsers![i].username}
                                            </td>
                                            <td className="nonessen">
                                                {data!.getUsers![i].email}
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
                                                                data!.getUsers![
                                                                    i
                                                                ].role
                                                            }
                                                        </option>
                                                        <option
                                                            value={`admin`}
                                                            onClick={e => {
                                                                setRole(e, i);
                                                            }}
                                                        >
                                                            Admin
                                                        </option>
                                                        <option
                                                            value={`developer`}
                                                            onClick={e => {
                                                                setRole(e, i);
                                                            }}
                                                        >
                                                            Developer
                                                        </option>
                                                        <option
                                                            value={`project-manager`}
                                                            onClick={e => {
                                                                setRole(e, i);
                                                            }}
                                                        >
                                                            Project-manager
                                                        </option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td className="nonessen">
                                                {data!.getUsers![i].firstname}
                                            </td>
                                            <td className="nonessen">
                                                {data!.getUsers![i].lastname}
                                            </td>
                                            <td>
                                                <button
                                                    name={`${
                                                        data!.getUsers![i].id
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
                            })}
                        </tbody>
                    </table>
                    Page Limit:
                    <input
                        className="browser-default pagination-input"
                        id="email_inline"
                        type="number"
                        min="1"
                        max="100"
                        value={state.limit}
                        onChange={e => {
                            setState({ ...state, limit: e.target.value });
                        }}
                    />
                    <ul className="pagination noselect">
                        {data.getUsers!.map((_val, i) => {
                            if (
                                i - 1 <
                                // eslint-disable-next-line
                                eval(`${data.getUsers!.length}/${state.limit}`)
                            ) {
                                if (i === 1) {
                                    return (
                                        <li
                                            key={i}
                                            className="active pag-active"
                                            id={`${i}li`}
                                        >
                                            {/* eslint-disable-next-line */}
                                            <a
                                                id={`${i}`}
                                                onClick={e => {
                                                    pagination(e);
                                                }}
                                            >
                                                {i}
                                            </a>
                                        </li>
                                    );
                                }
                                if (i !== 0) {
                                    return (
                                        <li key={i} id={`${i}li`}>
                                            {/* eslint-disable-next-line */}
                                            <a
                                                id={`${i}`}
                                                onClick={e => {
                                                    pagination(e);
                                                }}
                                            >
                                                {i}
                                            </a>
                                        </li>
                                    );
                                }
                            } else {
                                return <></>;
                            }
                            return <></>;
                        })}
                    </ul>
                </span>
            </div>
        </div>
    );
};
