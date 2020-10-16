import { useGetTicketsQuery } from "../../generated/graphql";

export const useGetTickets = () => {
    const { data, loading } = useGetTicketsQuery();
    if (loading || !data) { return {} }
    return data.getTickets
}