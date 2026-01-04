# Pokedex CLI

A command-line Pokedex application built with TypeScript that interacts with the [PokeAPI](https://pokeapi.co/).

## Installation

```bash
npm install
```

## Usage

```bash
npm run dev    # Build and run
npm run build  # Compile TypeScript only
npm start      # Run compiled version
npm test       # Run tests
```

## Commands

| Command | Description |
|---------|-------------|
| `help` | Display available commands |
| `map` | Show next 20 location areas |
| `mapb` | Show previous 20 location areas |
| `explore <location>` | List Pokemon in a location |
| `catch <pokemon>` | Attempt to catch a Pokemon |
| `inspect <pokemon>` | View details of a caught Pokemon |
| `pokedex` | List all caught Pokemon |
| `exit` | Exit the application |

## Example

```
Pokedex > map
canalave-city-area
eterna-city-area
...

Pokedex > explore canalave-city-area
Found Pokemon:
 - tentacool
 - tentacruel
 - staryu
...

Pokedex > catch staryu
Throwing a Pokeball at staryu...
staryu was caught!

Pokedex > inspect staryu
Name: staryu
Height: 8
Weight: 345
Stats:
 - hp: 30
 - attack: 45
...
Types:
 - water
```

## Features

- Interactive REPL interface
- API response caching with TTL
- Pagination for location browsing
- Pokemon catching with experience-based difficulty
