pokemonList = [
    { name: 'Bulbasaur', height: 2, types: ['Grass', 'Poison']},
    { name: 'Charmander', height: 1, types: ['Fire']},
    { name: 'Squirtle', height: .5, types: ['Water']}
];

for (let i = 0; i < pokemonList.length; i++) {
    let list = `${pokemonList[i].name} (Height: ${pokemonList[i].height}) (Types: ${pokemonList[i].types})`;
    document.write(list);
}
