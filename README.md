# PokemonAPI 

This app shows a list of pokemon that will display a modal with more information when the user clicks each pokemon. It utilizes a [pre-built API](https://pokeapi.co/api/v2/pokemon/?limit=20). The modal showcases the name of the pokemon, front and back picture, height, types, and abilities. Main strategy of the code is wrapping everything within an IIFE and only accessing it's protected data when called upon.

## Technologies Used

- JavaScript
- HTML
- CSS
- Bootsrap

## Features

- Search feature allows user to look for specific pokemon. `function searchPokemon()` filters through existing array that holds pokemon and pokemon details and returns a copy of a new array from the user input. if error checks pass, `addListItem()` holding dynamically built list of pokemon is passed to `filteredPokemon` and displays user's search results. 

- Added a scroll button that populates on screen once user scrolls `window.scrollY > 30`. Smooth scrolling for a better user experience adds a nice feature to both desktop and mobile. 




 
