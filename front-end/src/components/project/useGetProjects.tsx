import { useGetProjectDataQuery } from "../../generated/graphql";

export const useGetProjects = () => {
    const { data , loading } = useGetProjectDataQuery();

    if(loading || !data) {

    } else {
        let Projects = data.getProjectData;
        return Projects;
    }
}