import UserImage from "../img/unnamed.webp";
import React from "react";
import { useSelector } from "react-redux";
import { State, User } from "../redux/RootReducer";

export const MobileSideNav = () => {
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
    return (
        <>
            <ul className="collection">
                <li className="collection-item avatar">
                    <img src={UserImage} className="circle noselect" alt="" />
                    <span className="title noselect">
                        <b>Welcome, {user.username}</b>
                    </span>
                    <p>
                        {" "}
                        {user.email} <br />
                        <span className="noselect capitalize">
                            Current Role: {user.role}
                        </span>
                    </p>
                </li>
            </ul>

            <div className="divider"></div>

            <li className="btnli">
                <a href="#/dashboard" className="navLink" id="mobile-dashboard">
                    <button className="btn">
                        {" "}
                        <i className="left material-icons">dashboard</i>{" "}
                        <span className="left">Dashboard</span>
                    </button>
                </a>
            </li>
            {user.role === "admin" ? (
                <li className="btnli">
                    <a
                        href="#/manage-roles"
                        className="navLink"
                        id="mobile-man-roles"
                    >
                        <button className="btn">
                            {" "}
                            <i className="left material-icons">
                                people_outline
                            </i>
                            <span className="left">Manage Roles</span>
                        </button>
                    </a>
                </li>
            ) : null}
            {user.role === "admin" || user.role === "project-manager" ? (
                <li className="btnli">
                    <a
                        href="#/manage-projects"
                        className="navLink"
                        id="mobile-man-projects"
                    >
                        <button className="btn">
                            {" "}
                            <i className="left material-icons">people</i>
                            <span className="left">Manage Projects</span>
                        </button>
                    </a>
                </li>
            ) : null}
            <li className="btnli">
                <a href="#/projects" className="navLink" id="mobile-projects">
                    <button className="btn">
                        {" "}
                        <i className="left material-icons">widgets</i>
                        <span className="left">My Projects</span>
                    </button>
                </a>
            </li>
            <li className="btnli">
                <a href="#/tickets" className="navLink" id="mobile-tickets">
                    <button className="btn">
                        {" "}
                        <i className="left material-icons">local_offer</i>
                        <span className="left">My Tickets</span>
                    </button>
                </a>
            </li>
        </>
    );
};
