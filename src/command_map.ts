import type { State } from "./state.js";

export async function command_map(state: State) {
    const res = await state.pokeApi.fetchLocations(state.nextLocationsURL);
    state.prevLocationsURL = res.previous;
    state.nextLocationsURL = res.next;
    console.log('prevLocationsURL in the map', state.prevLocationsURL);
    res.results.forEach(location => console.log(location.name))
}
