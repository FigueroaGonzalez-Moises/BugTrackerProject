import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { State, User } from "../redux/RootReducer";
import UserImage from "../img/unnamed.webp";

export const Sidenav = () => {
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
        let loc = window.location.pathname;
        document.getElementById("tickets")!.classList.remove("active");
        document.getElementById("projects")!.classList.remove("active");
        if (user.role === "project-manager" || user.role === "admin") {
            document.getElementById("man-projects")!.classList.remove("active");
        }
        if (user.role === "admin") {
            document.getElementById("man-roles")!.classList.remove("active");
        }
        document.getElementById("dashboard")!.classList.remove("active");
        switch (loc) {
            case "/tickets": {
                document.getElementById("tickets")!.classList.add("active");
                document
                    .getElementById("mobile-tickets")!
                    .classList.add("active");
                break;
            }
            case "/projects": {
                document.getElementById("projects")!.classList.add("active");
                document
                    .getElementById("mobile-projects")!
                    .classList.add("active");
                break;
            }
            case "/manage-projects": {
                document
                    .getElementById("man-projects")!
                    .classList.add("active");
                document
                    .getElementById("mobile-man-projects")!
                    .classList.add("active");
                break;
            }
            case "/manage-roles": {
                document.getElementById("man-roles")!.classList.add("active");
                document
                    .getElementById("mobile-man-roles")!
                    .classList.add("active");
                break;
            }
            case "/dashboard": {
                document.getElementById("dashboard")!.classList.add("active");
                document
                    .getElementById("mobile-dashboard")!
                    .classList.add("active");
                break;
            }
        }
    });
    return (
        <>
            <ul className="collection">
                <li className="collection-item avatar">
                    <img src={UserImage} className="circle noselect" alt="" />
                    <span className="title noselect">
                        <b>Welcome, {user.username}</b>
                    </span>
                    <p>
                        {user.email}
                        <br />
                        <span className="noselect capitalize">
                            Current Role: {user.role}
                        </span>
                    </p>
                </li>
            </ul>

            <div className="divider"></div>

            <li className="btnli">
                <a href="#/dashboard" className="navLink" id="dashboard">
                    <button className="btn">
                        <i className="left material-icons">dashboard</i>{" "}
                        <span className="left">Dashboard</span>
                    </button>
                </a>
            </li>
            {user.role === "admin" ? (
                <li className="btnli">
                    <a href="#/manage-roles" className="navLink" id="man-roles">
                        <button className="btn">
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
                        id="man-projects"
                    >
                        <button className="btn">
                            <i className="left material-icons">people</i>
                            <span className="left">Manage Projects</span>
                        </button>
                    </a>
                </li>
            ) : null}
            <li className="btnli">
                <a href="#/projects" className="navLink" id="projects">
                    <button className="btn">
                        <i className="left material-icons">widgets</i>
                        <span className="left">My Projects</span>
                    </button>
                </a>
            </li>
            <li className="btnli">
                <a href="#/tickets" className="navLink" id="tickets">
                    <button className="btn">
                        <i className="left material-icons">local_offer</i>
                        <span className="left">My Tickets</span>
                    </button>
                </a>
            </li>
        </>
    );
};
