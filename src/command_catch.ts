import type { State } from "./state.js";

const getScaledProbability = (x: number) => {
  if (x < 100) return 80;
  if (x < 200) return 60;
  if (x < 300) return 40;
  if (x < 400) return 20;
  return 10;
};

const shouldTrigger = (x: number) => Math.random() * 100 < getScaledProbability(x);

export async function command_catch(state: State, ...args: string[]) {
    const name = args[0];
    console.log(`Throwing a Pokeball at ${name}...`);
    const pokemon = await state.pokeApi.fetchPokemon(name);

    if(shouldTrigger(pokemon.base_experience)) {
        state.pokeDex[pokemon.name] = pokemon;
        console.log(`${pokemon.name} was caught!`);
        console.log('You may now inspect it with the inspect command.');
    };
}
