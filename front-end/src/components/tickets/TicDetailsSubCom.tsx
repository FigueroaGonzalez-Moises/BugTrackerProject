import React from "react";
import { useGetTicketDataByIdQuery } from "../../generated/graphql";

interface Props {
    UserTickets: any,
    i: number
}

export const TicDetailsSubCom: React.FC<Props> = (props) => {

    const { data, loading } = useGetTicketDataByIdQuery( { 
        variables: { 
            id: `${props.UserTickets[props.i].ticketid}`
        }})
    
    if(loading || !data) {
        return(
            <tr>
                <td>
                    <div className = "progress">
                        <div className = "indeterminate"></div>
                    </div>
                </td>
            </tr>
        )
    }

    return(
        <tr key = {props.i}>
            { data.getTicketDataById.length !== 0 ? 
                <>
                    <td>{ data.getTicketDataById[0].title }</td>
                    <td className = "nonessen">{ data.getTicketDataById[0].developer }</td>
                    <td className = "nonessen">{ data.getTicketDataById[0].priority }</td>
                    <td>{ data.getTicketDataById[0].status }</td>
                    <td className = "nonessen">{ data.getTicketDataById[0].type }</td>
                    <td className = "noselect"><a href = {`#/ticket-details:${props.UserTickets[props.i].ticketid}`}>Details</a></td>
                </>
                : null
            }
        </tr>
    );
}