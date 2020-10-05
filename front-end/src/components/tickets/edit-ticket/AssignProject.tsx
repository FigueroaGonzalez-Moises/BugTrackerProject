import React, { useEffect, useState } from 'react';
import { useGetProjectDataQuery, useSetTicketProjectMutation } from '../../../generated/graphql';
import { ProjectDDWrapper } from './ProjectDDWrapper';
import { GetLocation } from '../../GetLocation';
interface Props {
    title: string,
    id: string
}

export const AssignProject: React.FC<Props> = (props) => {
    const { data, loading } = useGetProjectDataQuery();
    const [SetTicketProject] = useSetTicketProjectMutation();
    const [state, setState] = useState({
        project: '',
    })
    let ticketid = GetLocation();
    useEffect( () => {
        var elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems);
        elems = document.querySelectorAll('.modal');
        M.Modal.init(elems);
    })
    
    if(loading || !data) {
        return (
            <td>
                <div className = "progress">
                    <div className = "indeterminate"></div>
                </div>
            </td>
        )
    }
    
    const setProject = async (e: React.SyntheticEvent) => {
        let target = e.target as HTMLButtonElement;
        let projectid = target.name;
        setState({...state, project: `${projectid}`})
        await SetTicketProject({
            variables: {
                ticketid,
                projectid 
            }
        })
    }
    
    return(
        <td>
            {/* eslint-disable-next-line */}
            <a className='dropdown-trigger btn manage-dropdown' data-target='dropdownassign'>{state.project !== '' ? <span>{state.project}</span> : <ProjectDDWrapper />}</a>
            <ul id='dropdownassign' className='dropdown-content'>
                { data.getProjectData.map( ( _val, i, getProjectData ) => {
                    return(
                        <li key = {i}><button className = "btnDropdown" onClick = { (e) => setProject(e)} name = { `${getProjectData[i].projectid}` }>{ getProjectData[i].title }</button></li>
                    );
                })}
            </ul>
        </td>
    );
}