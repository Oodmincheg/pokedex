import type { State } from "./state.js";

export async function command_mapb(state: State) {
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
