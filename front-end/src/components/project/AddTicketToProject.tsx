import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { State } from "../../redux/RootReducer";
import { User } from "../../redux/RootReducer";
import { useGetUsers } from "../tickets/useGetUsers";
import { useCreateTicketMutation } from "../../generated/graphql";
import { GetLocation } from "../GetLocation";

export const AddTicketToProject: React.FC = () => {
    const UsersArray = useGetUsers();
    const history = useHistory();
    const id = GetLocation();
    const user = useSelector<State, User>( (state) => state.user || { id: 0,email: '',role: '',username: '',firstname: '',lastname: '',})
    const [Submit] = useCreateTicketMutation();
    const [state, setState] = useState({
        status: '',
        type: '',
        title: '',
        description: '',
        priority: '',
        dev: '',
    });

    useEffect( () => {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);

        elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems);

        elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems);
    })

    if(!UsersArray) {
        return(
            <div className = "progress">
                <div className = "indeterminate"></div>
            </div>
        );
    }

    const handleSubmit = async () => {
        if(state.status === '' || state.type === '' || state.title === '' || state.description === '' || state.priority === '') {
            M.toast({html: 'Missing Data'});
            document.getElementById('dev-hpr-br')?.classList.add('hide');
            document.getElementById('dev-hpr')?.classList.add('hide');
            
            document.getElementById('status-hpr-br')?.classList.add('hide');
            document.getElementById('status-hpr')?.classList.add('hide');
            
            document.getElementById('type-hpr-br')?.classList.add('hide');
            document.getElementById('type-hpr')?.classList.add('hide');

            document.getElementById('pri-hpr-br')?.classList.add('hide');
            document.getElementById('pri-hpr')?.classList.add('hide');

            if(state.title === '') {
                document.getElementById('title')!.classList.add('invalid');
            }

            if(state.description === '') {
                document.getElementById('desc')!.classList.add('invalid');
            }

            if(state.type === '') {
                document.getElementById('type-hpr-br')?.classList.toggle('hide');
                document.getElementById('type-hpr')?.classList.toggle('hide');
            }

            if(state.status === '') {
                document.getElementById('status-hpr-br')?.classList.toggle('hide');
                document.getElementById('status-hpr')?.classList.toggle('hide');
            }

            if(state.dev === '') {
                document.getElementById('dev-hpr-br')?.classList.toggle('hide');
                document.getElementById('dev-hpr')?.classList.toggle('hide');
            }

            if(state.priority === '') {
                document.getElementById('pri-hpr-br')?.classList.toggle('hide');
                document.getElementById('pri-hpr')?.classList.toggle('hide');
            }

        } else {
            await Submit({
                variables: {
                    title: state.title,
                    description: state.description,
                    belongsTo: `${id}`,
                    developer: state.dev,
                    priority: state.priority,
                    status: state.status,
                    submitter: user.username,
                    type: state.type
                }
            })
            history.push({ pathname: '#/manage' })   
        }
    }

    const setTicketType = (e: React.SyntheticEvent) => {
        let target = e.target as HTMLButtonElement;
        let type = target.name;
        setState({...state, type });
    }
    
    const setTicketStatus = (e: React.SyntheticEvent) => {
        let target = e.target as HTMLButtonElement;
        let status = target.name;
        setState({...state, status });
    }

    const SetTicketDev = (e: React.SyntheticEvent) => {
        let target = e.target as HTMLButtonElement;
        let dev = target.name;
        setState({...state, dev});
    }

    const setTicketPriority = (e: React.SyntheticEvent) => {
        let target = e.target as HTMLButtonElement;
        let priority = target.name;
        setState({...state, priority});
    }

    return (
        <div className = "container">
            <div className = "center-align table-wrapper">
                <span className = "table-header z-depth-2">
                    <h2 className = "white-text noselect">Create Ticket</h2>
                </span>

                <span className = "table-body z-depth-1">
                    <table className = "striped responsive">
                        <tbody>

                            <tr>
                                <th>TITLE</th>
                                <th>DESCRIPTION</th>
                            </tr>

                            <tr>
                                <td>
                                    <div className = "input-field">
                                        <input type = "text" id = "title" className = "validate" value = {state.title} onChange = { (e) => setState({...state, title: e.target.value})} />
                                        <label htmlFor = "title">ADD A TITLE</label>
                                        <span className="helper-text" data-error="Please enter a title"></span>
                                    </div>
                                </td>

                                <td>
                                    <form>
                                        <div className = "input-field">
                                            <input type = "text" id = "desc" className = "validate" value = {state.description} onChange = { (e) => setState({...state, description: e.target.value})} />
                                            <label htmlFor = "desc">ADD A DESCRIPTION</label>
                                            <span className="helper-text" data-error="Please enter a Description"></span>
                                        </div>
                                    </form>
                                </td>

                            </tr>

                            <tr>
                                <th>ASSIGN A DEVELOPER</th>
                                <th>SUBMITTER</th>
                            </tr>

                            <tr>
                                <td>
                                {/* eslint-disable-next-line */}
                                    <a className='dropdown-trigger btn manage-dropdown' data-target='dropdownDev'>{ state.dev !== '' ? <span>{ state.dev }</span> : <span>Assign a Developer</span>}</a>
                                    <ul id='dropdownDev' className='dropdown-content'>
                                        { UsersArray!.UsersArray!.map((_val, i, UsersArray) => {
                                            return(
                                                <li key = {i}><button className = "btnDropdown" name = {`${UsersArray[i].username}`} onClick = { (e) => SetTicketDev(e) }>{UsersArray[i].username}</button></li>
                                            );
                                        })}
                                    </ul>
                                    <br className = "helper-br hide" id = "dev-hpr-br"/>
                                    <span className = "fake-helper-text red-text hide" id = "dev-hpr">Please Assign a Developer</span>
                                </td>
                                <td>{ user.username } (YOU)</td>
                            </tr>

                            <tr>
                                <th>BELONGS TO PROJECT</th>
                                <th>TICKET PRIORITY</th>
                            </tr>

                            <tr>
                                <td>
                                    #{id}
                                </td>

                                <td>
                                    <a className='dropdown-trigger btn manage-dropdown' href='#!' data-target='dropdownpriority'>{state.priority !== '' ? <span>{state.priority}</span> : <span>Ticket Priority</span>}</a>
                                    <ul id='dropdownpriority' className='dropdown-content'>
                                        <li><button className = "btnDropdown" name = "low" onClick = { (e) => setTicketPriority(e)}>Low</button></li>
                                        <li><button className = "btnDropdown" name = "medium" onClick = { (e) => setTicketPriority(e)}>Medium</button></li>
                                        <li><button className = "btnDropdown" name = "high" onClick = { (e) => setTicketPriority(e)}>High</button></li>
                                    </ul>
                                    <br className = "helper-br hide" id = "pri-hpr-br"/>
                                    <span className = "fake-helper-text red-text hide" id = "pri-hpr">Please Assign a Ticket Priority</span>
                                </td>
                            </tr>

                            <tr>
                                <th>TICKET STATUS</th>
                                <th>TICKET TYPE</th>
                            </tr>

                            <tr>

                                <td>
                                    {/* eslint-disable-next-line */}
                                    <a className='dropdown-trigger btn manage-dropdown' href='#!' data-target='dropdownstatus'>{ state.status !== '' ? <span>{ state.status }</span> : <span>Set Ticket Status</span> }</a>
                                    <ul id='dropdownstatus' className='dropdown-content'>
                                        <li><button className = "btnDropdown" name = "open" onClick = { (e) => setTicketStatus(e)}>Open</button></li>
                                        <li><button className = "btnDropdown" name = "closed" onClick = { (e) => setTicketStatus(e)}>Closed</button></li>
                                        <li><button className = "btnDropdown" name = "on-hold" onClick = { (e) => setTicketStatus(e)}>On Hold</button></li>
                                    </ul>
                                    <br className = "helper-br hide" id = "status-hpr-br"/>
                                    <span className = "fake-helper-text red-text hide" id = "status-hpr">Please Select a Ticket Status</span>
                                </td>

                                <td>
                                    {/* eslint-disable-next-line */}
                                    <a className='dropdown-trigger btn manage-dropdown' href='#!' data-target='dropdowntype'>{ state.type !== '' ? <span>{ state.type }</span> : <span>Set Ticket Type</span> }</a>
                                    <ul id='dropdowntype' className='dropdown-content'>
                                        <li><button className = "btnDropdown" name = "bugs-errors" onClick = { (e) => setTicketType(e)}>Bugs/Errors</button></li>
                                        <li><button className = "btnDropdown" name = "features" onClick = { (e) => setTicketType(e)}>Features</button></li>
                                    </ul>
                                    <br className = "helper-br hide" id = "type-hpr-br"/>
                                    <span className = "fake-helper-text red-text hide" id = "type-hpr">Please Select a Ticket Type</span>
                                </td>

                            </tr> 
                            
                        </tbody>
                    </table>

                    <div className = "divider"></div>

                    <div className = "row">
                        <button className = "btn left footerBtn modal-trigger" data-target = "cancelModal">Back</button>
                        <button className = "btn right safe-btn" onClick = { () => handleSubmit()}>Submit</button>
                    </div>

                </span>

                <div id="cancelModal" className  = "modal">
                    <div className  = "modal-content">
                        <h4>ARE YOU SURE YOU WANT TO CANCEL?</h4>
                        <h6>All of your Data will be erased</h6>
                    </div>
                    <div className  = "modal-footer">
                        <button className  = "modal-close waves-effect waves-green btn-flat">Stay On Page</button>
                        <button className  = "modal-close red white-text waves-effect waves-red btn-flat" onClick = { () => history.goBack() }>CANCEL</button>
                    </div>
                </div>

            </div>
        </div>
    );
}