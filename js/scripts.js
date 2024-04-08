//document.write can't parse objects in HTML for this. Must use console.log to test

let pokemonRepository = (function() {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

    let modalContainer = document.querySelector('#modal-container');

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

    //builds modal to display details and details are pulled from loadDetails()
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            
            //clear all existing modal content
            modalContainer.innerHTML = '';

            let modal = document.createElement('div');
            modal.classList.add('modal');

            let closeButtonElement = document.createElement('button');
            closeButtonElement.classList.add('modal-close');
            closeButtonElement.innerText = 'Close';
            closeButtonElement.addEventListener('click', hideModal);

            let titleElement = document.createElement('h1');
            titleElement.classList.add('pokemon-name');
            titleElement.innerText = pokemon.name.toUpperCase();

            //not working (div pulls in url instead)
            let imgElementFront = document.createElement('img');
            imgElementFront.classList.add('img-front');
            imgElementFront.src = pokemon.imgUrlFront;

            let imgElementBack = document.createElement('img');
            imgElementBack.classList.add('img-back');
            imgElementBack.src = pokemon.imgUrlBack;

            let pokemonHeight = document.createElement('div');
            pokemonHeight.innerText = pokemon.height;

            //pulls in [object, object] not working yet
            let pokemonTypes = document.createElement('div');
            pokemonTypes.classList.add('pokemon-types');

            //Accessing array of objects from api and joining each type with a comma
            let types = pokemon.types.map(item => item.type.name).join(', ');
            pokemonTypes.innerText = types.toUpperCase();

            modal.appendChild(closeButtonElement);
            modal.appendChild(titleElement);
            modal.appendChild(imgElementFront);
            modal.appendChild(imgElementBack);
            modal.appendChild(pokemonHeight);
            modal.appendChild(pokemonTypes);
            modalContainer.appendChild(modal);

            modalContainer.classList.add('is-visible');
        })
    }

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    //eventListener holding showDetails() that is passed to addListItem() to keep code clean
    function buttonEvent(button, pokemon) {
        button.addEventListener('click', function() {
            showDetails(pokemon);
        })
    }

    //closes modal if you click anywhere on the modalContainer
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    })

    //allows user to hit escape to close modal
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });


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
            item.imgUrlFront = details.sprites.front_default;
            item.imgUrlBack = details.sprites.back_default;
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
        loadDetails: loadDetails,
        
    };
})();

//accesses pokemonRepository with getAll() and loops through pokemonList with forEach by
//calling on repository.addListItem to create each button with details
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach((pokemon) => {
        pokemonRepository.addListItem(pokemon);
    });
});
