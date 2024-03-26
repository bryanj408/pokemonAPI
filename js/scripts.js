//document.write can't parse objects in HTML for this. Must use console.log to test

let pokemonRepository = (function() {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (typeof pokemon == 'object') {
            pokemonList.push(pokemon);
        } else {
            console.log('There was some trouble adding pokemon. Check add() or loadList()');
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

    //logs pokemon details from eventListner in buttonEvent() and passes to addListItem()
    //details are pulled from loadDetails()
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            console.log(pokemon);
        })
    }

    //eventListener holding showDetails() that is passed to addListItem() to keep code clean
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

    //The LoadList() method will fetch data from the API, then add each Pokémon
    //in the fetched data to pokemonList with the add function
    function loadList() {
        return fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function(json) {
            json.results.forEach(function(item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function(error) {
            console.error(error);
        })
    }

    //fetches details called out from detailsUrl of API and is passed to showDetails()
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            //double check back sprite is correct
            item.imageUrl = details.sprites.back_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function(error) {
            console.error(error);
        })
    }

    return {
        add: add,
        addListItem: addListItem,
        getAll: getAll,
        remove: remove,
        loadList: loadList,
        loadDetails: loadDetails
    };
})();

//accesses pokemonRepository with getAll() and loops through pokemonList with forEach by
//calling on repository.addListItem to create each button with details
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach((pokemon) => {
        pokemonRepository.addListItem(pokemon);
    });
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

