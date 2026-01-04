import type { State } from "./state.js";

export async function command_pokedex(state: State) {
    const names = Object.keys(state.pokeDex);
    if (names.length === 0) {
        console.log('Your Pokedex is empty. Catch some Pokemon first!');
        return;
    }
    console.log('Your Pokedex:');
    for (const name of names) {
        console.log(` - ${name}`);
    }
}
