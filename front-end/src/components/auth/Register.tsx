import React, { useState, useEffect } from "react";
import { useRegisterMutation } from "../../generated/graphql";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../../accessToken";

export const Register: React.FC<RouteComponentProps> = ({ history }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [role, setRole] = useState("");
    const [register] = useRegisterMutation();

    var URI = "";
    if (process.env.NODE_ENV === "production") {
        URI = "https://murmuring-wildwood-31770.herokuapp.com";
    } else {
        URI = "http://localhost:4000";
    }

    useEffect(() => {
        var elems = document.querySelectorAll(".dropdown-trigger");
        M.Dropdown.init(elems);
    });

    const submitForm = async () => {
        if (
            email.length > 1 &&
            password.length > 1 &&
            username.length > 1 &&
            firstname.length > 1 &&
            lastname.length > 1
        ) {
            await fetch(`${URI}/check-refresh-token`, {
                method: "POST",
                credentials: "include",
            }).then(async res => {
                if (res.status === 499) {
                    const response2 = await register({
                        variables: {
                            email,
                            password,
                            username,
                            role,
                            firstname,
                            lastname,
                        },
                    });

                    if (response2 && response2.data) {
                        setAccessToken(response2.data.register.accessToken);
                        localStorage.setItem(
                            "refreshToken",
                            response2.data.register.refreshToken
                        );
                    }
                }
            });
            history.push("/");
            window.location.reload();
        } else {
            if (email.length < 1) {
                document.getElementById("email")!.classList.add("invalid");
            }

            if (password.length < 1) {
                document.getElementById("password")!.classList.add("invalid");
            }

            if (username.length < 1) {
                document.getElementById("username")!.classList.add("invalid");
            }

            if (firstname.length < 1) {
                document.getElementById("firstname")!.classList.add("invalid");
            }

            if (lastname.length < 1) {
                document.getElementById("lastname")!.classList.add("invalid");
            }
        }
    };

    return (
        <div className="loginPageWrapper">
            <div className="container">
                <div className="center-align table-wrapper">
                    <span className="table-header z-depth-2">
                        <h2 className="white-text">Sign Up</h2>
                    </span>

                    <div className="table-body z-depth-1">
                        <div className="row">
                            <div className="input-field ">
                                <input
                                    id="email"
                                    type="email"
                                    className="validate"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                                <label htmlFor="email">Email</label>
                                <span
                                    className="helper-text"
                                    data-error="Please enter a valid email"
                                ></span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field ">
                                <input
                                    id="password"
                                    type="password"
                                    className="validate"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <label htmlFor="password">Password</label>
                                <span
                                    className="helper-text"
                                    data-error="Please enter a password"
                                ></span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s6 m6 l6 xl6">
                                <input
                                    id="username"
                                    type="text"
                                    className="validate"
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                />
                                <label htmlFor="username">Username</label>
                                <span
                                    className="helper-text"
                                    data-error="Please enter a username"
                                ></span>
                            </div>

                            <div className="input field col s6 m6 l6 xl6">
                                <span
                                    className="dropdown-trigger btn manage-dropdown"
                                    id="roleDD"
                                    data-target="dropdownRole"
                                >
                                    Role
                                </span>
                                <ul
                                    id="dropdownRole"
                                    className="dropdown-content"
                                >
                                    <li>
                                        <button
                                            className="btnDropdown"
                                            name="admin"
                                            onClick={(
                                                e: React.SyntheticEvent
                                            ) => {
                                                let target = e.target as HTMLButtonElement;
                                                let N = target.name;
                                                setRole(N);
                                            }}
                                        >
                                            Admin
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            className="btnDropdown"
                                            name="developer"
                                            onClick={(
                                                e: React.SyntheticEvent
                                            ) => {
                                                let target = e.target as HTMLButtonElement;
                                                let N = target.name;
                                                setRole(N);
                                            }}
                                        >
                                            Developer
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            className="btnDropdown"
                                            name="project-manager"
                                            onClick={(
                                                e: React.SyntheticEvent
                                            ) => {
                                                let target = e.target as HTMLButtonElement;
                                                let N = target.name;
                                                setRole(N);
                                            }}
                                        >
                                            Project Manager
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="row">
                            <div className="input-field col s6 m6 l6 xl6">
                                <input
                                    id="firstname"
                                    type="text"
                                    className="validate"
                                    value={firstname}
                                    onChange={e => setFirstname(e.target.value)}
                                />
                                <label htmlFor="firstname">First Name</label>
                                <span
                                    className="helper-text"
                                    data-error="Please enter your first name"
                                ></span>
                            </div>

                            <div className="input-field col s6 m6 l6 xl6">
                                <input
                                    id="lastname"
                                    type="text"
                                    className="validate"
                                    value={lastname}
                                    onChange={e => setLastname(e.target.value)}
                                />
                                <label htmlFor="lastname">Last Name</label>
                                <span
                                    className="helper-text"
                                    data-error="Please enter your last name "
                                ></span>
                            </div>
                        </div>

                        <span className="buttons">
                            <button
                                className="btn stretched mb authAction"
                                onClick={e => submitForm()}
                            >
                                Register
                            </button>
                            <span className="centered mb">
                                <span>OR</span>
                            </span>
                            <a href="#/login">
                                <button
                                    type="button"
                                    className="btn stretched mb authAction"
                                >
                                    Login Here
                                </button>
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
