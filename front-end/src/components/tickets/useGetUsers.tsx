import { useGetUsersQuery } from "../../generated/graphql";

export const useGetUsers = () => {
    
    const { data, loading } = useGetUsersQuery();

    if(loading || !data) {

    } else {
        let UsersArray = data.getUsers
        return {
            UsersArray
        }
    }


}