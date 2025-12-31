import { initState } from "./state.js";

export function cleanInput(input: string): string[] {
    return input.toLocaleLowerCase().split(' ').filter(Boolean);
}

export function startREPL() {
    const state = initState();
    const { readline, commands } = state;
    readline.prompt();
    readline.on("line", line => {
        const input = cleanInput(line);

        commands[input[0]]?.callback(state);
        readline.prompt();

    });

}
