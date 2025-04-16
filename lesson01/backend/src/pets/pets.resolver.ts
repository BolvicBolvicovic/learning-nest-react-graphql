import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PetsService } from './pets.service';
import { Pet, PetInput } from './pet.entity';
import { getDefaultAutoSelectFamilyAttemptTimeout } from 'net';

@Resolver(of => Pet)
export class PetsResolver {
    constructor(private petsService: PetsService) {}

    @Query(returns => [Pet])
    pets(): Promise<Pet[]> {
        return this.petsService.findAll();
    }

    @Query(returns => Pet)
    pet(@Args('id') id: string): Promise<Pet | undefined> {
        return this.petsService.findOne(+id);
    }

    @Mutation(returns => Pet)
    createPet(@Args('petInput') petInput: PetInput): Promise<Pet> {
        return this.petsService.create(petInput);
    }

    @Mutation(returns => Pet)
    deletePet(@Args('id') id: string): Promise<Pet | undefined> {
        return this.petsService.delete(+id);
    }
}
