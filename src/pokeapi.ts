import { Cache } from './pokecache.js';

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private static readonly locationPath = '/location-area';
  private static readonly pokemonPath = '/pokemon';
  #cacheClient: Cache;

  constructor() {
    this.#cacheClient = new Cache(5000);
  }

  async #cachedFetch<T>(url: string, label: string): Promise<T> {
    const cached = this.#cacheClient.get<T>(url);
    if (cached) {
      console.log(`${label} was read from cache`);
      return cached;
    }
    const res = await fetch(url);
    const value = await res.json();
    this.#cacheClient.add(url, value);
    return value;
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}${PokeAPI.locationPath}`;
    return this.#cachedFetch<ShallowLocations>(url, 'shallow locations');
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}${PokeAPI.locationPath}/${locationName}`;
    return this.#cachedFetch<Location>(url, 'location');
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}${PokeAPI.pokemonPath}/${pokemonName}`;
    return this.#cachedFetch<Pokemon>(url, 'pokemon');
  }
}

export type ShallowLocations = {
    count: number
    next: string
    previous: string
    results: Location[]
};

export type Location = {
    name: string;
    pokemon_encounters: PokemonEncounter[];
};

type PokemonEncounter = {
    pokemon: Pokemon;
};

export type Pokemon = {
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    stats: PokemonStat[];
    types: PokemonType[];
};

type PokemonStat = {
    base_stat: number;
    stat: {
        name: string;
    };
};

type PokemonType = {
    type: {
        name: string;
    };
};
