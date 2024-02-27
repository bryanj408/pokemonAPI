pokemonList = [
    { name: 'Bulbasaur', height: 2, types: ['Grass', ' Poison']},
    { name: 'Charmander', height: 1, types: ['Fire']},
    { name: 'Squirtle', height: .5, types: ['Water']}
];

//loops through pokemonList using a template literal to inject strings and variables
//Added <br> to seperate each object. \n does not display correctly on the DOM
for (let i = 0; i < pokemonList.length; i++) {
    let result = `${pokemonList[i].name} (Height: ${pokemonList[i].height}) (Types: ${pokemonList[i].types})<br>`;
    document.write(result);
}
