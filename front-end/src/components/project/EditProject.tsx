import React, { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { useGetProjectDataByIdQuery, useSetProjectDescMutation, useSetProjectTitleMutation, useDeleteProjectMutation } from "../../generated/graphql";
import { EditAss } from "./edit-project/EditAss";
import { EditPTTable } from "./edit-project/EditPTTable";
import { GetLocation } from "../GetLocation";
import { JsFooterStyling } from "../../css/JsStyling";

export const EditProject: React.FC = () => {
    const history: any = useHistory(); 
    const [state, setState] = useState({
        pTitle: '',
        pDesc: '',
    });
    let id = GetLocation();
    const { data, loading } = useGetProjectDataByIdQuery({ variables: { projectid: `${id}` }});
    const [setDesc] = useSetProjectDescMutation();
    const [setTitle] = useSetProjectTitleMutation();
    const [delProj] = useDeleteProjectMutation();

    useEffect( () => {
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems);

        elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
        
        elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);

        JsFooterStyling();
    });

    window.onresize = () => {
        JsFooterStyling();
    }

    if(loading || !data) {
        return(
            <div className = "progress">
                <div className = "indeterminate"></div>
            </div>
        );
    }

    if(data.getProjectDataById.length === 0) {
        return(
            <Redirect to = '/manage-projects' />
        )
    }

    const updateProject = async () => {
        if(state.pDesc !== '' || state.pTitle !== '') {
            if(state.pTitle !== '') {
                setTitle({
                    variables: {
                        projectid: `${id}`,
                        title: `${state.pTitle}`
                    }
                });
                M.toast({html: 'Project Title Successfully Changed'});
            }
            if(state.pDesc !== '') {
                setDesc({
                    variables: {
                        projectid: `${id}`,
                        description: `${state.pDesc}`
                    }
                });
                M.toast({html: 'Project Description Successfully Changed'});
            }
        }
    }

    const deleteProject = async () => {
        let tmp = await delProj({
            variables: {
                projectid: `${id}`
            }
        })
        if(tmp) {
            window.location.reload();
        } else {
            M.toast({html: 'An Error Occured while deleting project'});
        }
    }

    return (
        <div className = "detailsWrapper container-fluid">
            <div className = "center-align table-wrapper">
                <span className = "table-header z-depth-2">
                    
                    <h2 className = "white-text">Edit Project #{id}</h2>
                </span>

                <span className = "table-body z-depth-1">
                    <table className = "responsive-table striped">
                        <thead>
                            <tr>
                                <th>Project Title</th>
                                <th>Project Description</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>
                                    <div className = "input-field">
                                        <input type="text" id = "project-name" value = { state.pTitle } onChange = { (e) => setState({ ...state, pTitle: e.target.value}) }/>
                                        <label htmlFor = "project-name">{state.pTitle !== '' ? <span>{state.pTitle}</span> : data.getProjectDataById[0].title }</label>
                                    </div>
                                </td>
                                <td>
                                    <div className = "input-field">
                                        <input type="text" id = "project-desc" value = { state.pDesc } onChange = { (e) => setState({ ...state, pDesc: e.target.value}) }/>
                                        <label htmlFor = "project-desc">{state.pDesc !== '' ? <span>{state.pDesc}</span> : data.getProjectDataById[0].description}</label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className = "row">
                        <span className = "col s5 m5 l5 xl5">
                            <span className = 'personnel-header z-depth-2 col s12 m12 l12 xl12'>
                                <h3 className = "white-text">Assigned Personnel</h3>
                            </span>

                            <table className = "responsive-table striped">
                                <thead>
                                    <tr>
                                        <th><b>User Name</b></th>
                                        <th><b>Email</b></th>
                                        <th><b>Role</b></th>
                                    </tr>
                                </thead>
                                <EditAss />
                            </table>
                        </span>

                        <span className = "col s5 m5 l5 xl5 offset-s2 offset-m2 offset-l2 offset-xl2">
                            <span className = "tickets-header z-depth-2 col s12 m12 l12 xl12">
                                <h3 className = "white-text">Tickets for Project #{id}</h3>
                            </span>

                            <table className = "responsive-table striped">
                                <thead>
                                    <tr>
                                        <th><b>Title</b></th>
                                        <th><b>Submitter</b></th>
                                        <th><b>Developer</b></th>
                                        <th><b>Status</b></th>
                                    </tr>
                                </thead>
                                <EditPTTable />
                            </table>
                        </span>
                    </div>

                    <div className = "divider"></div>
                    <div className = "row">
                        <button id = "backBtn" className = "btn left footerBtn" onClick = { () =>  history.goBack() }>Back</button>
                        <button id = "deleteBtn" className = "btn center danger-btn modal-trigger" data-target="modal1">DELETE</button>  
                        <button id = "submitBtn" className = "btn right safe-btn" onClick = { () => {updateProject()} }>Submit</button>
                    </div>
                </span>

                <div id="modal1" className  = "modal">
                    <div className  = "modal-content">
                        <h4>ARE YOU SURE YOU WANT TO DELETE PROJECT #{id}</h4>
                    </div>
                    <div className  = "modal-footer">
                    <button className  = "modal-close waves-effect waves-green btn-flat">CANCEL</button>
                    <button className  = "modal-close red white-text waves-effect waves-red btn-flat" onClick = { () => deleteProject() }>DELETE</button>
                    </div>
                </div>
            </div>
        </div>
    );
}