import { createInterface, type Interface } from "node:readline";
import { command_exit } from "./command_exit.js";
import { command_help } from "./commant_help.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
    name: string
    description: string
    callback: (state: State) => Promise<void>
};

export type CLICommands = Record<string, CLICommand>;

export type State = {
    pokeApi: PokeAPI
    prevLocationsURL: string
    nextLocationsURL: string
    readline: Interface
    commands: CLICommands
};

export function getCommands(): CLICommands {
  return {
    exit: {
        name: "exit",
        description: "Exits the pokedex",
        callback: command_exit,
    },
    help: {
       name: "help",
       description: "Displays a help message",
       callback: command_help, 
    },
    map: {
        name: "map",
        description: "Displays the names of next 20 location areas in the Pokemon world.",
        callback: async (state: State) => {
            const res = await state.pokeApi.fetchLocations(state.nextLocationsURL);
            state.prevLocationsURL = res.previous;
            state.nextLocationsURL = res.next;
            console.log('prevLocationsURL in the map', state.prevLocationsURL);
            res.results.forEach(location => console.log(location.name))
        }
    },
    mapb: {
        name: "mapb",
        description: "Displays the names of previous 20 location areas in the Pokemon world.",
        callback: async (state: State) => {
            console.log('prevLocationsURL in the mapb', state.prevLocationsURL);
            if(!state.prevLocationsURL) {
                console.log('You are on the first page.');
                return;
            };
            const res = await state.pokeApi.fetchLocations(state.prevLocationsURL);
            state.prevLocationsURL = res.previous;
            state.nextLocationsURL = res.next;
            res.results.forEach(location => console.log(location.name))
        }
    }
  };
}

export function initState(): State {
    const options = {
        input: process.stdin,
        output: process.stdout,
        prompt: 'Pokedex > '
    }
    const pokeApi = new PokeAPI();

    return {
        pokeApi,
        nextLocationsURL: '',
        prevLocationsURL: '',
        readline: createInterface(options),
        commands: getCommands()
    }
}
