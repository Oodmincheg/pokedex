import { createInterface, type Interface } from "node:readline";
import { command_exit } from "./command_exit.js";
import { command_explore } from "./command_explore.js";
import { command_help } from "./commant_help.js";
import { command_map } from "./command_map.js";
import { command_mapb } from "./command_mapb.js";
import { command_catch } from "./command_catch.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
    name: string
    description: string
    callback: (state: State, ...args: string[]) => Promise<void>
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
        callback: command_map,
    },
    mapb: {
        name: "mapb",
        description: "Displays the names of previous 20 location areas in the Pokemon world.",
        callback: command_mapb,
    },
    explore: {
        name: "explore",
        description: "Displays the names of pokemons for location with a given name.",
        callback: command_explore,
    },
    catch: {
        name: "explore",
        description: "Displays the names of pokemons for location with a given name.",
        callback: command_catch,
    },
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
