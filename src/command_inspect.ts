import type { State } from "./state.js";

export async function command_inspect(state: State, ...args: string[]) {
    const name = args[0];
    const pokemon = state.pokeDex[name];

    if (!pokemon) {
        console.log('you have not caught that pokemon');
        return;
    }

    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log('Stats:');
    for (const stat of pokemon.stats) {
        console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log('Types:');
    for (const t of pokemon.types) {
        console.log(`  - ${t.type.name}`);
    }
}
