import { useGetUserTicketsQuery } from "../../generated/graphql"

export const useGetUserTickets = () => {
    const { data, loading } = useGetUserTicketsQuery();
    if (loading || !data) { return {} }
    return data.getUserTickets;
}