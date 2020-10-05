import React from "react";
import { useGetTicketProjectQuery } from "../../../generated/graphql"
import { GetLocation } from "../../GetLocation";
import { ProjectDD } from "./ProjectDD";

export const ProjectDDWrapper: React.FC = () => {
    const id = GetLocation();
    const { data, loading } = useGetTicketProjectQuery({ variables: { 
        ticketid: `${id}`
    }});

    if(loading || !data) {
        return(
            <div className = "progress">
                <div className = "indeterminate"></div>
            </div>
        );
    }
    
    return(
        <span>
            <ProjectDD projectid = {`${data.getTicketProject[0].projectid}`} />
        </span>
    );
}