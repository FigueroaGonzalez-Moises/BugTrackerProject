import React, { FC } from "react";
import { Route, RouteProps, Redirect } from "react-router-dom";
import { getAccessToken } from "../accessToken";
import jwtDecode from "jwt-decode";

export const checkAuth = () => {
    const token = getAccessToken();
    if (!token) {
        return false;
    }
    try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
            return false;
        } else {
            return true;
        }
    } catch {
        return false;
    }
};

interface IAuthRouteProps extends RouteProps {
    component: any;
}

const AuthRoute: FC<IAuthRouteProps> = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            checkAuth() ? (
                <Component {...props} />
            ) : (
                <Redirect to="/dashboard" />
            )
        }
    />
);

export default AuthRoute;
