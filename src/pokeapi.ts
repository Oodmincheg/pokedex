export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private static readonly locationPath = '/location-area';
  private static readonly locationNamePath = '/location';
  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    // implement this
    const url = pageURL || `${PokeAPI.baseURL}${PokeAPI.locationPath}`;
    const res = await fetch(url);
    return res.json();

  }

  async fetchLocation(locationName: string): Promise<Location> {
    // implement this
    const url = `${PokeAPI.baseURL}${PokeAPI.locationNamePath}/${locationName}`;
    const res = await fetch(url);
    return res.json();
  }
}

export type ShallowLocations = {
    count: number
    next: string
    previous: string
    results: Location[]
};

export type Location = {
    name: string
    url: string
};
