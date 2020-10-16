import AuthRoute from "./authRoute";
import AdminRoute from "./adminRoute";
import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { Dashboard } from "../components/Dashboard/Dashboard";
import { ManageRoles } from "../components/manage/roles/Roles";
import { ManageProjects } from "../components/manage/projects/ManProjects";
import { Projects } from "../components/project/Projects";
import { Tickets } from "../components/tickets/Tickets";
import { ProjectDetails } from "../components/project/ProjectDetails";
import { TicketDetails } from "../components/tickets/TicketDetails";
import { EditProject } from "../components/project/EditProject";
import { EditTicket } from "../components/tickets/edit-ticket/EditTicket";
import { AddTicketToProject } from "../components/project/AddTicketToProject";
import { CreateProject } from "../components/project/create-project/CreateProject";
import { useSelector } from "react-redux";
import { State, User } from "../redux/RootReducer";
import PmRoute from "./pmRoute";
import TicketComments from "../components/tickets/TicketComments";

export const Routes: React.FC = () => {
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
        <Switch>
            <AuthRoute exact path="/dashboard" component={Dashboard} />
            <AdminRoute
                user={user}
                exact
                path="/manage-roles"
                component={ManageRoles}
            />
            <PmRoute
                user={user}
                exact
                path="/manage-projects"
                component={ManageProjects}
            />
            <AuthRoute exact path="/projects" component={Projects} />
            <PmRoute
                user={user}
                exact
                path="/create-project"
                component={CreateProject}
            />
            <PmRoute
                user={user}
                exact
                path="/edit-project:id"
                component={EditProject}
            />
            <PmRoute
                user={user}
                exact
                path="/project-add:id"
                component={AddTicketToProject}
            />
            <AuthRoute path="/project-details:id" component={ProjectDetails} />
            <AuthRoute path="/ticket-details:id" component={TicketDetails} />
            <AuthRoute path="/ticket-details:id" component={TicketComments} />
            <AuthRoute path="/edit-ticket:id" component={EditTicket} />
            <AuthRoute exact path="/tickets" component={Tickets} />
            <Route render={() => <Redirect to="/dashboard" />} />
        </Switch>
    );
};

export default Routes;
