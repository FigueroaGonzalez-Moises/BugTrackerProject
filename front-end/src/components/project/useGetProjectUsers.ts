import { useGetProjectUsersByIdQuery } from "../../generated/graphql";
import { GetLocation } from "../GetLocation";

const useGetProjectUsers = () => {
    let id = GetLocation();
    const { data, loading } = useGetProjectUsersByIdQuery({
        variables: { projectid: `${id}` },
    });

    if (loading || !data) {
    } else {
        let AssignedUsers = data.getProjectUsersById;
        return AssignedUsers;
    }
};

export default useGetProjectUsers;
