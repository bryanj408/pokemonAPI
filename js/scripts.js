pokemonList = [
    { name: 'Bulbasaur', height: 2, types: ['Grass', ' Poison']},
    { name: 'Charmander', height: 1, types: ['Fire']},
    { name: 'Squirtle', height: .5, types: ['Water']}
];

//loops through pokemonList using a template literal to inject strings and variables
//Added <br> to seperate each object. \n does not display correctly on the DOM
// for (let i = 0; i < pokemonList.length; i++) {
//     let result = `${pokemonList[i].name} (Height: ${pokemonList[i].height}) (Types: ${pokemonList[i].types})<br>`;
//     document.write(result);
// }

pokemonList.forEach((pokemon) => {
    let result = `${pokemon.name} (Height: ${pokemon.height}) (Types: ${pokemon.types})<br>`;
    document.write(result);
})





// let objectName = {
//     name: "Joe",
//     Age: 29,
//     color: "Blue",
//     emptyArray: []
// }

// //displays object keys
// console.log(Object.keys(objectName));
// //adds Anne to end of array
// objectName.emptyArray.push("Anne");
// console.log(objectName);
// objectName.emptyArray.push("Bryan", "Haley");
// //adds Marlowe to the beginning of array
// objectName.emptyArray.unshift("Marlowe");
// //removes last item of array
// objectName.emptyArray.pop()
// //removes first item of the array
// objectName.emptyArray.shift()
// //reverses items of the array
// objectName.emptyArray.reverse();
