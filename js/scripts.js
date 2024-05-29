let pokemonRepository = (function() {

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    //capitalize the first letter of a string. string.slice(1) returns the rest of the string after charAt(0) 
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

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
            item.imgUrlMain = details.sprites.other.dream_world.front_default;
            item.imgUrlFront = details.sprites.front_default;
            item.imgUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types;
            item.abilities = details.abilities;
        }).catch(function(error) {
            console.error(error);
        })
    }

    function add(pokemon) {
        if (typeof pokemon == 'object') {
            pokemonList.push(pokemon);
        } else {
            console.log('There was some trouble adding pokemon.');
    }
}

    //creates ul and li and button per pokemon and logs details to console
    function addListItem(pokemon) {
        loadDetails(pokemon).then(function() {

            let row = document.querySelector('.row');
            row.classList.add('justify-content-center');

            let list = document.createElement('div');
            list.classList.add('pokemon-list', 'col-9', 'col-md-4', 'col-lg-3', 'm-1', 'd-flex');
    
            let button = document.createElement('button');
            button.classList.add('pokemon-button', 'btn', 'col', 'd-flex', 'justify-content-center', 'align-items-center'); //add bootstrap classes
            button.setAttribute('data-target', '#modalOpen');
            button.setAttribute('type', 'button');
            button.setAttribute('data-toggle', 'modal');
            button.innerText = capitalizeFirstLetter(pokemon.name);
    
            let image = document.createElement('img');
            image.classList.add('img-main', 'd-flex', 'me-2', 'justify-content-center', 'align-items-center');
            image.src = pokemon.imgUrlMain;
            
            button.prepend(image);
            list.appendChild(button);
            row.appendChild(list);
            
            button.addEventListener('click', function() {
                showDetails(pokemon);
            })
        })
    }

    //passes loadDetails() to showModal()
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            showModal(pokemon); 
        })
    }

    function showModal(pokemon) {
    
        let modalTitle = document.querySelector('.modal-title');


        let modalBody = document.querySelector('.modal-body');
        modalBody.classList.add(pokemon.name);

        modalTitle.innerText = ''; //clears title section each time
        modalBody.innerText = ''; //clears body section each time

        let pokemonName = document.createElement('h1');
        pokemonName.innerText = capitalizeFirstLetter(pokemon.name);

        let imgContainer = document.createElement('div');
        imgContainer.classList.add('d-flex', 'justify-content-center');

        let imgElementFront = document.createElement('img');
        imgElementFront.classList.add('img-front');
        imgElementFront.src = pokemon.imgUrlFront;

        let imgElementBack = document.createElement('img');
        imgElementBack.classList.add('img-back');
        imgElementBack.src = pokemon.imgUrlBack;

        let pokemonHeight = document.createElement('div');
        pokemonHeight.innerText = `Height: ${pokemon.height}`;

        let pokemonWeight = document.createElement('div');
        pokemonWeight.innerText = `Weight: ${pokemon.weight}`;

        //Accessing array of objects from api and joining each type with a comma
        let pokemonTypes = document.createElement('div');
        let types = pokemon.types.map(item => item.type.name).join(', ');
        pokemonTypes.innerText = `Type: ${types}`;

        let pokemonAbilities = document.createElement('div');
        let abilities = pokemon.abilities.map(item => item.ability.name).join(', ');
        pokemonAbilities.innerText = `Ability: ${abilities}`;
        
        modalTitle.appendChild(pokemonName);
        imgContainer.append(imgElementFront, imgElementBack)
        modalBody.appendChild(imgContainer);
        modalBody.appendChild(pokemonHeight);
        modalBody.appendChild(pokemonWeight);
        modalBody.appendChild(pokemonTypes);
        modalBody.appendChild(pokemonAbilities);

        $('#modalOpen').modal('show');
    }

    //selects scroll button
    let scrollButton = document.querySelector('#scrollToTopButton');

    //listen for a scroll event and show/hide scroll button
    window.onscroll = function() {
        if (window.scrollY > 30) {
            scrollButton.style.display = 'inline';
        } else {
            scrollButton.style.display = 'none';
        }
    }

    //clicking scroll button brings you back to the top
    scrollButton.addEventListener('click', function() {
       window.scrollTo({
        top: 0,
        behavior: 'smooth'  
       });
    });


    //search field that filters pokemon by name
    function searchPokemon(pokemon) {
        let userInput = searchBar.value.toLowerCase();

        let filteredPokemon = pokemonList.filter((pokemon) => {
            return pokemon.name.toLowerCase().includes(userInput);
        }); 

        let clearPokemonList = document.querySelector('.row');
        clearPokemonList.innerHTML = '';

        searchBar.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        });

        if (filteredPokemon.length === 0) {
            let message = "Sorry, this pokemon does not exist";
            clearPokemonList.innerText = message;
        } else {
            filteredPokemon.forEach((pokemon) => {
                addListItem(pokemon);
            })
        }
    }
    
    let searchBar = document.querySelector('#search-bar');
    searchBar.addEventListener('input', searchPokemon);
    

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

