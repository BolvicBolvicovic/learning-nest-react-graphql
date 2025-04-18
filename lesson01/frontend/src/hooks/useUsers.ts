import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

const petsQuery = `
    {
        users {
            id,
            name,
            role
        }
    }`;

export function useUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => 
        {
            const resp = request('http://localhost:3000/graphql', petsQuery);
            console.log(resp);
            return resp;
        },
    });
}