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
        if (typeof pokemon == 'object') {
            pokemonList.push(pokemon);
        } else {
            console.log('Add an object this way: {name: String, height: int, types: [string, string]');
        }
    }

    //creates ul and li and button per pokemon and logs details to console
    function addListItem(pokemon) {
        let list = document.querySelector('ul');
        list.classList.add('list-class');

        let listItem = document.createElement('li');
    
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('button-class');

        listItem.appendChild(button);
        list.appendChild(listItem);

        //function that holds eventListener for button
        buttonEvent(button, pokemon);
    }

    //logs pokemon details from eventListner from within addListItem() above ^^
    function showDetails(pokemon) {
        console.log(pokemon);
    }

    //eventListener holding showDetails() that is passed to addListItem() to seperate code a little
    function buttonEvent(button, pokemon) {
        button.addEventListener('click', function() {
            showDetails(pokemon);
        })
    }

    function getAll() {
        return pokemonList;
    }

    function remove() {
        pokemonList.pop();
    }

    return {
        add: add,
        addListItem: addListItem,
        getAll: getAll,
        remove: remove
    };

})();

//accesses pokemonRepository with getAll() and loops through pokemonList with forEach by
//calling on repository.addListItem to create each button with details
pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
});







// let body = document.querySelector('body');
// let container = document.createElement('container');
// let addSomeText = document.createElement('h1');
// addSomeText.classList.add('h1');

// addSomeText.innerText = 'This is added text';
// addSomeText.setAttribute('id', 'Hello');
// addSomeText.setAttribute('id', 'new-id');
// console.log(addSomeText.getAttribute('id'));


// body.appendChild(container);
// container.appendChild(addSomeText);
// console.log(addSomeText.innerText);
// //returns the element tag in uppercase
// console.log(addSomeText.tagName);



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

