import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

const petsQuery = `
    query pets {
        name,
        type
    }`;

export function usePets() {
    return useQuery({
        queryKey: ['pets'],
        queryFn: async () => request('/graphql', petsQuery),
    });
}