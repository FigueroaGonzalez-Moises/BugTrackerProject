import { useGetProjectDataByIdQuery } from "../../../generated/graphql"
import React from "react";

interface Props {
    projectid: string
}

export const ProjectDD: React.FC<Props> = (props) => {
    
    const { data, loading } = useGetProjectDataByIdQuery({ variables: { projectid: props.projectid }});

    if(loading || !data) {
        return(
            <div className = "progress">
                <div className = "indeterminate"></div>
            </div>
        )
    }
    
    return(
        <span>
            { data.getProjectDataById[0].title }
        </span>
    );
}