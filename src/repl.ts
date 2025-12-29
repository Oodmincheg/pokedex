export function cleanInput(input: string): string[] {
    return input.split(' ').filter(Boolean);
}

export function startREPL() {
    prompt('hello')

}
