import { User, Project } from "../RootReducer";



export const setUserInfo = (user: User) => {
    return {
        type: 'ADD_USER_INFO', user: user
    }
}

export const passProjectInfo = (project: Project) => {
    return {
        type: 'PASS_PROJECT_INFO', project: project
    }
}