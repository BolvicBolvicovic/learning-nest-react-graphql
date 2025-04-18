import { PetsForm } from "@/components/petsForm";
import { PetsList } from "@/components/petsList";

export default function Home() {

    return (
      <div className="flex flex-col items-center w-screen p-4">
        <h1>Pet Shop</h1>
        <div className="flex flex-raw items-center justify-center min-h-screen w-screen space-x-4">
          <PetsList />
          <PetsForm />
        </div>
      </div>
    );

}