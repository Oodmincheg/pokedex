import { Cache } from './pokecache.js';

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private static readonly locationPath = '/location-area';
  private static readonly pokemonPath = '/pokemon';
  #cacheClient: Cache;

  constructor() {

    this.#cacheClient = new Cache(5000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}${PokeAPI.locationPath}`;
    const cached = this.#cacheClient.get<ShallowLocations>(url);
    if(!!cached) { 
        console.log('shallow locations were read from cache');
        return cached;
    }

    const res = await fetch(url);
    const value = res.json();
    this.#cacheClient.add(url, value);
    return value;

  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}${PokeAPI.locationPath}/${locationName}`;
    const cached = this.#cacheClient.get<Location>(url);
    if(!!cached) { 
        console.log('location was read from cache');
        return cached;
    }
    const res = await fetch(url);
    const value = res.json();
    this.#cacheClient.add(url, value);
    return value;
  }

  async fetchPokemon(pokemonName:string): Promise<Pokemon> {
      const url = `${PokeAPI.baseURL}${PokeAPI.pokemonPath}/${pokemonName}`;
      const cached = this.#cacheClient.get<Pokemon>(url);
      if(!!cached) { 
        console.log('pokemon was read from cache');
        return cached;
      }
      const res = await fetch(url);
      const value = res.json();
      this.#cacheClient.add(url, value);
      return value;
  };
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
};
