import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import request from "graphql-request";

const petsQuery = `
    {
        pets {
            name,
            type
        }
    }`;

const newPetQuery = `
    mutation($name: String!, $type: String) {
        createPet(petInput: {name: $name, type: $type}) {
            name,
            type
        }
    }
`;

export function usePets() {
    return useQuery({
        queryKey: ['pets'],
        queryFn: async () => 
        {
            const resp = request('http://localhost:3000/graphql', petsQuery);
            console.log(resp);
            return resp;
        },
    });
}

export function useNewPet() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: ['createPet'],
        mutationFn: async (pet: {name: string, type?: string}) => {
            return request('http://localhost:3000/graphql', newPetQuery, pet);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pets'] });
        }
    });
}