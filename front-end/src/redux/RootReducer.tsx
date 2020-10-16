export type User = {
    id: number,
    email: string,
    role: string,
    username: string,
    firstname: string,
    lastname: string,
}

export type Project = {
    title: string,
    description: string,
    projectid: number,
}

export interface State {
    user?: User
    project?: Project
}

const initState = {
    user: {
        id: 0,
        email: '',
        role: '',
        username: '',
        firstname: '',
        lastname: '',
    },

    project: {
        title: '',
        description: '',
        projectid: 0,
    }
}


type Actions = {
    user?: any,
    type: string,
    project: Project,
}

export const RootReducer = (state: State = initState, action: Actions) => {
    switch(action.type) {
        case "ADD_USER_INFO": {
            return {...state, user: action.user};
        }
        case "PASS_PROJECT_INFO": {
            return {...state, project: action.project}
        }
        default: 
            return state;
    }
}