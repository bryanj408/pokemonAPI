let pokemonRepository = (function() {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //LoadList() method will fetch data from the API, then add each Pokémon
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

    function add(pokemon) {
        if (typeof pokemon == 'object') {
            pokemonList.push(pokemon);
        } else {
            console.log('There was some trouble adding pokemon. Check add() or loadList()');
    }
}

    //creates ul and li and button per pokemon and logs details to console
    function addListItem(pokemon) {
        let list = document.querySelector('.pokemon-list');
        list.classList.add('list-group');    
        
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item','list-group-item-action'); 
        listItem.setAttribute('role', 'listitem'); //set aria role
    
        let button = document.createElement('button');
        button.classList.add('btn', 'btn-secondary'); //add bootstrap classes
        button.setAttribute('type', 'button');
        button.innerText = pokemon.name;
        
        listItem.append(button);
        list.append(listItem);
        

        // function that holds eventListener for button
        buttonEvent(button, pokemon);
    }

    function showModal() {
        let modalHeader = document.querySelector('.modal-header');
        let modalTitle = document.querySelector('.modal-title');
        let modalBody = document.querySelector('modal-body');

        modalTitle.empty();
        modalBody.empty();

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;
        
        modalTitle.append(titleElement);

        //Accessing array of objects from api and joining each type with a comma
        let types = pokemon.types.map(item => item.type.name).join(', ');
        pokemonTypes.innerText = types.toUpperCase();
    }

    //passes loadDetails() to showModal()
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            showModal(pokemon); 
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

    return {
        add: add,
        addListItem: addListItem,
        getAll: getAll,
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







// OLD JAVASCRIPT TO BUILD MODAL (keeping until transition to bootstrap modal complete)


// function remove() {
    //     pokemonList.pop();
    // }

  //closes modal if you click anywhere on the modalContainer
    // modalContainer.addEventListener('click', (e) => {
    //     let target = e.target;
    //     if (target === modalContainer) {
    //         hideModal();
    //     }
    // })

    //allows user to hit escape to close modal
    // window.addEventListener('keydown', (e) => {
    //     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    //         hideModal();
    //     }
    // });

    // function hideModal() {
    //     modalContainer.classList.remove('is-visible');
    // }

//created modal with javascript

  //clear all existing modal content
            // modalContainer.innerHTML = '';

            // let modal = document.createElement('div');
            // modal.classList.add('modal');

            // let closeButtonElement = document.createElement('button');
            // closeButtonElement.classList.add('modal-close');
            // closeButtonElement.innerText = 'Close';
            // closeButtonElement.addEventListener('click', hideModal);

            // let titleElement = document.createElement('h1');
            // titleElement.classList.add('pokemon-name');
            // titleElement.innerText = pokemon.name.toUpperCase();

            
            // let imgElementFront = document.createElement('img');
            // imgElementFront.classList.add('img-front');
            // imgElementFront.src = pokemon.imgUrlFront;

            // let imgElementBack = document.createElement('img');
            // imgElementBack.classList.add('img-back');
            // imgElementBack.src = pokemon.imgUrlBack;

            // let pokemonHeight = document.createElement('div');
            // pokemonHeight.innerText = pokemon.height;

            // let pokemonTypes = document.createElement('div');
            // pokemonTypes.classList.add('pokemon-types');

            // modal.appendChild(closeButtonElement);
            // modal.appendChild(titleElement);
            // modal.appendChild(imgElementFront);
            // modal.appendChild(imgElementBack);
            // modal.appendChild(pokemonHeight);
            // modal.appendChild(pokemonTypes);
            // modalContainer.appendChild(modal);

            // modalContainer.classList.add('is-visible');