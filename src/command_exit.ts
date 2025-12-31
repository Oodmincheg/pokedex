import type { State } from "./state.ts";

export async function command_exit(state: State) {
    console.log('Closing the Pokedex... Goodbye!');
    state.readline.close();
    process.exit(0);
};

