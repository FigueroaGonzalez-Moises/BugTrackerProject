
export const CheckIfInProject = (id: any, projectUsers: any) => {
    var tmp = false;
    let users = projectUsers.projectUsers
    for(let x = 0; x < users.length; x++) {
        if(users[x].id === id) {
            tmp = true
        }
    }

    return tmp;
}