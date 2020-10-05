import React, { useEffect } from "react";
import { useLogoutMutation } from "../generated/graphql";
import { setAccessToken } from "../accessToken";
import { Sidenav } from "./Sidenav";
import { MobileSideNav } from "./MobileSideNav";

interface Props {
    children?: any;
}

export const UI: React.FC<Props> = ({ children }) => {
    const [LOGOUT, { client }] = useLogoutMutation();

    useEffect(() => {
        var elems = document.querySelectorAll(".dropdown-trigger");
        M.Dropdown.init(elems, {
            hover: true,
        });
    });

    const logout = async () => {
        await LOGOUT();
        setAccessToken("");
        await client!.resetStore();
        window.location.reload();
    };

    return (
        <div id="navWrapper" className="navWrapper">
            <span id="NAVBAR" className="z-depth-4 noselect">
                <ul id="user-actions" className="dropdown-content">
                    <li>
                        {/* eslint-disable-next-line */}
                        <a
                            onClick={() => {
                                logout();
                            }}
                        >
                            Logout
                            <i className="material-icons">exit_to_app</i>
                        </a>
                    </li>
                </ul>

                <ul id="notifications" className="dropdown-content">
                    <li></li>
                </ul>
                <nav>
                    <div className="nav-wrapper">
                        {/* eslint-disable-next-line */}
                        <a href="#!" className="brand-logo">
                            <i className="material-icons">bug_report</i>{" "}
                            <b>Bug Tracker</b>
                        </a>

                        {/* eslint-disable-next-line */}
                        <a
                            href="#"
                            data-target="slide-out"
                            className="sidenav-trigger"
                        >
                            <i className="material-icons">menu</i>
                        </a>
                        <ul
                            id="nav-mobile"
                            className="right hide-on-med-and-down"
                        >
                            <li>
                                {/* eslint-disable-next-line */}
                                <a
                                    className="dropdown-trigger"
                                    data-target="user-actions"
                                >
                                    USER ACTIONS{" "}
                                    <i className="material-icons right">
                                        arrow_drop_down
                                    </i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </span>
            <ul id="slide-out" className="sidenav">
                <span id="MOBILE_SIDENAV" className="z-depth-4">
                    <MobileSideNav />
                </span>
            </ul>

            <span id="SIDENAV" className="z-depth-4">
                <Sidenav />
            </span>

            <span id="CONTENT">{children ? children : null}</span>
        </div>
    );
};
