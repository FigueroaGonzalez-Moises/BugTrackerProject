import React from "react";
import { useGetUserQuery } from "./generated/graphql";
import {
    HashRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import "materialize-css/dist/css/materialize.min.css";
import { UI } from "./components/UI";
import { checkAuth } from "./clientSideAuth/checkAuth.js";
import { Routes } from "./routes/Routes";
import { useDispatch } from "react-redux";
import { setUserInfo } from "./redux/actions/userActions";

export const App: React.FC = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useGetUserQuery();

    if (loading) {
        return (
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
        );
    } else if (!error && data) {
        const user = data.getUser;
        if (checkAuth()) {
            if (user) {
                dispatch(setUserInfo(user));
            }
        }
    }

    return (
        <Router>
            <div className="App">
                {checkAuth() ? (
                    <UI children={<Routes />} />
                ) : (
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route render={() => <Redirect to="/login" />} />
                    </Switch>
                )}
            </div>
        </Router>
    );
};

export default App;
