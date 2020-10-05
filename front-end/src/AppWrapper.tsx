import App from "./App";
import React, { useState, useEffect } from "react";
import { setAccessToken } from "./accessToken";
import "./css/dashboard.scss";
import "./css/login.scss";
import "./css/manage.scss";
import "./css/medias.scss";
import "./css/nav.scss";

export const AppWrapper: React.FC = () => {
    const [loading, setLoading] = useState(true);
    var URI = "";
    if (process.env.NODE_ENV === "production") {
        URI = "https://murmuring-wildwood-31770.herokuapp.com";
    } else {
        URI = "http://localhost:4000";
    }
    useEffect(() => {
        let tmp = localStorage.getItem("refreshToken") as string;

        fetch(`${URI}/refresh_token`, {
            method: "POST",
            credentials: "include",
            headers: {
                refreshToken: tmp,
            },
        }).then(async res => {
            const { accessToken, refreshToken } = await res.json();
            setAccessToken(accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            setLoading(false);
        });

        var elems = document.querySelectorAll(".sidenav");
        M.Sidenav.init(elems);

        M.AutoInit();
    }, [URI]);

    if (loading) {
        return (
            <div className="preloader-wrapper big active">
                ...loading
                <div className="spinner-layer spinner-blue">
                    <div className="circle-clipper left">
                        <div className="circle"></div>
                    </div>
                    <div className="gap-patch">
                        <div className="circle"></div>
                    </div>
                    <div className="circle-clipper right">
                        <div className="circle"></div>
                    </div>
                </div>
            </div>
        );
    }

    return <App />;
};

export default AppWrapper;
