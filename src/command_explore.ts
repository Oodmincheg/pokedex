import type { State } from "./state.js";

export async function command_explore(state: State, ...args: string[]) {
    const locationName = args[0];
    const res = await state.pokeApi.fetchLocation(locationName);
    res.pokemon_encounters.map(pokemonEnc => pokemonEnc.pokemon.name).forEach(name => console.log(name));
}
