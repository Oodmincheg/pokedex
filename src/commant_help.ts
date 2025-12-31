import type { State } from "./state";

export async function command_help(state: State) {
    console.log(`Welcome to the Pokedex! \n Usage:`);
    for(const {name, description} of Object.values(state.commands)) {
       console.log(`${name}: ${description}`);
       state.readline.prompt();
    };
};
