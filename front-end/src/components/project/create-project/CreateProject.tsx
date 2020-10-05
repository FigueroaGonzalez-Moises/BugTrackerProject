import React, { useState, useEffect } from "react";
import { useGetUsersQuery, useAddProjectMutation } from "../../../generated/graphql";
import { useHistory } from "react-router-dom";
import { useGetUsers } from "../../tickets/useGetUsers";

export const CreateProject: React.FC = () => {
    const { data, loading } = useGetUsersQuery();
    const history = useHistory();
    const UsersArray = useGetUsers();
    const [SUBMIT] = useAddProjectMutation();
    const [state, setState] = useState({
        title: '',
        description: '',
        userids: [] as number[],
        usernames: [] as string[],
        userString: ''
    })

    useEffect(() => {
        var elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    })

    if (loading || !data || !UsersArray) {
        return (
            <div className="progress">
                <div className="indeterminate"></div>
            </div>
        );
    }

    const handleSubmit = async () => {
        if (state.title === '' || state.description === '') {
            if (state.title === '') {
                document.getElementById('title')?.classList.add('invalid');
            }
            if (state.description === '') {
                document.getElementById('desc')?.classList.add('invalid');
            }

            M.toast({ html: 'Missing Data' });
        } else {
            await SUBMIT({
                variables: {
                    description: state.description,
                    title: state.title,
                    users: state.userString
                }
            })
            M.toast({ html: 'Project added successfully' });
            window.location.replace('/manage-projects');
        }
    }

    const addUser = async (id: number, username: string) => {
        let tmp = state.userids as number[];
        let tmp2 = state.usernames as string[];

        if (tmp.indexOf(id) === 0) {
            tmp.shift();
        } else if (tmp.indexOf(id) !== -1) {
            let q = tmp.slice(0, tmp.indexOf(id));
            let q2 = tmp.slice(tmp.indexOf(id), tmp.length);
            tmp = q;
            tmp = tmp.concat(q2);
        } else {
            tmp = tmp.concat(id);
        }

        if (tmp2.indexOf(username) === 0) {
            tmp2.shift();
        } else if (tmp2.indexOf(username) !== -1) {
            let q = tmp2.slice(0, tmp2.indexOf(username));
            let q2 = tmp2.slice(tmp2.indexOf(username) + 1, tmp2.length);
            tmp2 = q;
            tmp2 = tmp2.concat(q2);
        } else {
            tmp2 = tmp2.concat(username);
        }
        let tmp3 = state.userString + ` ${tmp}`;
        setState({ ...state, userids: tmp, usernames: tmp2 });
        setState({ ...state, userString: tmp3 });
    }

    return (
        <>

            <div className="detailsWrapper container-fluid">
                <div className="center-align table-wrapper">
                    <span className="table-header z-depth-2">
                        <h2 className="white-text noselect">Create Project</h2>
                    </span>

                    <span className="table-body z-depth-1">
                        <table className="striped responsive-table">
                            <thead>
                                <tr>
                                    <th>TITLE</th>
                                    <th>DESCRIPTION</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>
                                        <div className="input-field">
                                            <input type="text" id="title" className="validate" value={state.title} onChange={(e) => setState({ ...state, title: e.target.value })} />
                                            <label htmlFor="title">ADD A TITLE</label>
                                            <span className="helper-text" data-error="Please enter a title"></span>
                                        </div>
                                    </td>

                                    <td>
                                        <form>
                                            <div className="input-field">
                                                <input type="text" id="desc" className="validate" value={state.description} onChange={(e) => setState({ ...state, description: e.target.value })} />
                                                <label htmlFor="desc">ADD A DESCRIPTION</label>
                                                <span className="helper-text" data-error="Please enter a Description"></span>
                                            </div>
                                        </form>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="row">
                            <span className="col s5 m5 l5 xl5">
                                <span className='personnel-header z-depth-2 col s12 m12 l12 xl12'>
                                    <h3 className="white-text">Assign Personnel</h3>
                                </span>

                                <table className="responsive-table striped">
                                    <thead>
                                        <tr>
                                            <th className="centered">
                                                <b>User Name</b>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {state.usernames.map((_val, i) => {
                                            return (
                                                <tr key={i}>
                                                    {state.usernames[i]}
                                                </tr>
                                            );
                                        })}
                                    </tbody>


                                </table>
                                <div className="input-field col s12">
                                    <select className="browser-default">
                                        <option value="" disabled selected>Click to add/remove</option>
                                        {data!.getUsers!.map((_val, i, getUsers) => {
                                            return (
                                                <option key={i} onClick={() => { addUser(getUsers[i].id, getUsers[i].username) }}>  {getUsers[i].username} </option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </span>


                        </div>

                        <div className="divider"></div>
                        <div className="row">
                            <button className="btn left footerBtn modal-trigger modal-trigger" data-target="cancelModal">Back</button>
                            <button className="btn right safe-btn" onClick={() => handleSubmit()}>Submit</button>
                        </div>
                    </span>

                    <div id="cancelModal" className="modal">
                        <div className="modal-content">
                            <h4>ARE YOU SURE YOU WANT TO CANCEL?</h4>
                            <h6>All of your Data will be erased</h6>
                        </div>
                        <div className="modal-footer">
                            <button className="modal-close waves-effect waves-green btn-flat">Stay On Page</button>
                            <button className="modal-close red white-text waves-effect waves-red btn-flat" onClick={() => history.goBack()}>CANCEL</button>
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
}