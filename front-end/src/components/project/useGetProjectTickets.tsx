import { useGetProjectTicketsQuery } from "../../generated/graphql";
import { GetLocation } from "../GetLocation";

const useGetProjectTickets = () => {
    let id = GetLocation();

    const { data, loading } = useGetProjectTicketsQuery({
        variables: { id: `${id}` },
    });

    if (loading || !data) {
    } else {
        let Tickets = data.getProjectTickets;
        return Tickets;
    }
};

export default useGetProjectTickets;
