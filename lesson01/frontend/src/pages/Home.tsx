import { PetsForm } from "@/components/petsForm";
import { PetsList } from "@/components/petsList";
import { UsersList } from "@/components/usersList";
import { Origami } from "lucide-react";

export default function Home() {

    return (
      <div className="flex flex-col items-center w-screen p-4">
        <h1 className="flex flex-row items-center justify-center">
          <Origami size={48} />
          Pet Shop
        </h1>
        <div className="flex flex-raw max-row-2 items-center justify-center min-h-screen w-screen space-x-4">
          <PetsList />
          <PetsForm />
        </div>
        <div className="flex flex-raw max-row-2 items-center justify-center min-h-screen w-screen space-x-4">
          <UsersList />
        </div>
      </div>
    );

}