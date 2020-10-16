import React, { useState, useEffect } from "react";
import {
    useLoginMutation,
    useDemoLoginMutation,
} from "../../generated/graphql";
import { RouteComponentProps } from "react-router";
import { setAccessToken } from "../../accessToken";
import M from "materialize-css";

export const Login: React.FC<RouteComponentProps> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useLoginMutation();
    const [demoLogin] = useDemoLoginMutation();

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

    const submitForm = async (e?: React.SyntheticEvent, role?: string) => {
        if (e) {
            e.preventDefault();
        }
        if (!!role) {
            try {
                await demoLogin({
                    variables: {
                        role,
                    },
                });
            } catch (err) {
                console.log("Could not set Role Err :>> ", err);
            }

            try {
                const response2 = await login({
                    variables: {
                        email: "demo@demo.com",
                        password: "demoPassword",
                    },
                });

                try {
                    if (response2 && response2.data) {
                        setAccessToken(response2.data.login.accessToken);
                        localStorage.setItem(
                            "refreshToken",
                            response2.data.login.refreshToken
                        );
                    }
                } catch (err) {
                    console.log("Could not set tokens ERR :>> ", err);
                }
                window.location.reload();
            } catch (err) {
                console.log("Could not login Err :>> ", err);
                M.toast({ html: "Failed Login" });
                M.toast({ html: "Server is likely down" });
            }
        } else {
            try {
                if (email.length > 1 && password.length > 1) {
                    await fetch(`${URI}/check-refresh-token`, {
                        method: "POST",
                        credentials: "include",
                    }).then(async res => {
                        if (res.status === 499) {
                            const response2 = await login({
                                variables: {
                                    email: email,
                                    password: password,
                                },
                            });

                            if (response2 && response2.data) {
                                setAccessToken(
                                    response2.data.login.accessToken
                                );
                                localStorage.setItem(
                                    "refreshToken",
                                    response2.data.login.refreshToken
                                );
                            }
                        }
                    });
                    window.location.reload();
                } else if (password.length < 1 && email.length < 1) {
                    document
                        .getElementById("password")!
                        .classList.add("invalid");
                    document.getElementById("email")!.classList.add("invalid");
                } else if (password.length < 1) {
                    document
                        .getElementById("password")!
                        .classList.add("invalid");
                }
            } catch (error) {
                console.log("error :>> ", error);
            }
        }
    };

    const demoUser = async (e: React.SyntheticEvent, role: string) => {
        e.preventDefault();
        const response = await demoLogin({
            variables: {
                role,
            },
        });

        if (response && response.data) {
            setAccessToken(response.data.demoLogin.accessToken);
            localStorage.setItem(
                "refreshToken",
                response.data.demoLogin.refreshToken
            );
        }
    };

    return (
        <div className="loginPageWrapper">
            <div className="container">
                <div className="center-align table-wrapper">
                    <span className="login-header z-depth-2">
                        <h2 className="white-text">Login</h2>
                    </span>

                    <div className="table-body z-depth-1">
                        <div className="row">
                            <div className="input-field">
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
                            <div className="input-field">
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
                                    data-error="Please enter a valid password"
                                ></span>
                            </div>
                        </div>

                        <span className="buttons">
                            <a href="#/login">
                                <button
                                    type="button"
                                    className="btn stretched mb authAction"
                                    onClick={e => submitForm(e)}
                                >
                                    Login
                                </button>
                            </a>
                            <span className="centered mb">
                                <span>OR</span>
                            </span>
                            <button
                                type="submit"
                                className="btn stretched mb authAction"
                                onClick={() => {
                                    document
                                        .getElementById("dd")!
                                        .classList.remove("hide");
                                }}
                            >
                                Demo User
                            </button>
                            <span
                                className="dropdown-trigger btn stretched manage-dropdown hide"
                                id="dd"
                                data-target="dropdownRole"
                            >
                                Role
                            </span>
                            <ul id="dropdownRole" className="dropdown-content">
                                <li>
                                    <button
                                        className="btnDropdown"
                                        onClick={async e => {
                                            submitForm(e, "admin");
                                        }}
                                    >
                                        Admin
                                    </button>
                                </li>

                                <li>
                                    <button
                                        className="btnDropdown"
                                        onClick={e => {
                                            setEmail("demo@demo.com");
                                            setPassword("demoPassword");
                                            demoUser(e, "developer");
                                        }}
                                    >
                                        Developer
                                    </button>
                                </li>

                                <li>
                                    <button
                                        className="btnDropdown"
                                        onClick={e => {
                                            setEmail("demo@demo.com");
                                            setPassword("demoPassword");
                                            demoUser(e, "project-manager");
                                        }}
                                    >
                                        Project Manager
                                    </button>
                                </li>
                            </ul>
                            <span className="centered mb">
                                <span>OR</span>
                            </span>
                            <span className="centered">
                                <div>
                                    <u>
                                        <a href="#/register">Sign Up Here</a>
                                    </u>
                                </div>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
