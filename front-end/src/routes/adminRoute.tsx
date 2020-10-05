import React, { SFC } from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { getAccessToken } from '../accessToken';
import jwtDecode from 'jwt-decode';

export const checkAuth = (user: any) => {
    const token = getAccessToken(); 
    if (!token) {
        return false;
    }
    try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
            return false;
        } else {
            if(user.role === 'admin') {
                return true;
            } else {
                return false;
            }
        }
    } catch(error) {
        console.log('error :>> ', error);
        return false;
    }
}

interface IAdminRouteProps extends RouteProps {
    component: any;
    user: any;
}

const AdminRoute: SFC<IAdminRouteProps> = ({
    component: Component,
    user,
    ...rest
}) => {
    return (
        <Route 
            {...rest} 
            render={props => 
                checkAuth( user ) ? (
                    <Component {...props} />
                ) : (
                    null
                )
            }
        />
    );
}

export default AdminRoute;