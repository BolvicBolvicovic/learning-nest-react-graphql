import { UseQueryResult } from "@tanstack/react-query";
import { useDeletePet, usePets } from "@/hooks/usePets";
import { Button } from "./ui/button";

export function PetsList() {
    const pets: UseQueryResult<unknown, Error> = usePets();
    const {mutate} = useDeletePet();

    return (
          <div className="flex flex-col items-center justify-center w-full p-4 space-y-4 bg-white rounded-lg shadow-md">
            <div className="text-2xl font-bold">Pets</div>
            <div >
              <div className="font-bold">Name - Pet Type</div>
              {pets.data ? pets.data.pets.map((pet: any) => {
                function onClick() {
                    mutate(String(pet.id), {
                        onSuccess: (data) => {
                        console.log("Pet deleted successfully", data);
                        },
                        onError: (error) => {
                        console.error("Error deleting pet", error);
                        },
                    })
                }

                return (
                    <div className="flex items-center justify-between w-full p-2 border-b">
                        <div key={pet.name} className="w-full">
                          {pet.name} - {pet.type ? pet.type : "Unknown"}
                        </div>
                        <Button
                          className="justify-end ml-4"
                          onClick={onClick}
                        > Delete Pet </Button>
                    </div>
                )

              }) : (
                <div>No data available...</div>
              )}
            </div>
          </div>
    );
}