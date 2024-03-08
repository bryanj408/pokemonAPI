//document.write can't parse objects in HTML for this. Must use console.log to test

let pokemonRepository = (function() {

    pokemonList = [
        { 
            name: 'Bulbasaur', 
            height: 2, 
            types: ['Grass', ' Poison']
        },
        { 
            name: 'Charmander', 
            height: 1, 
            types: ['Fire']
        },
        { 
            name: 'Squirtle', 
            height: .5, 
            types: ['Water']
        }
    ];

    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };

})();

pokemonRepository.add({name: 'Picachu', height: 2, types: ['lightning', 'ground']});

//accesses pokemonRepository with getAll() and loops through pokemonList with forEach by
//injecting specific details in the template literal and writing to the DOM
pokemonRepository.getAll().forEach((pokemon) => {
    let result = `${pokemon.name} (Height: ${pokemon.height}) (Types: ${pokemon.types})<br>`;
    document.write(result); 
});






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
