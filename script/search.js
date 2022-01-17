
// Get value from input field and uppercase the value
function searchPokemon() {
    let search = document.getElementById('search');
    search.value.toUpperCase();
    renderSearchResult(search.value.toUpperCase());
}


// Render search result
function renderSearchResult(searchValue) {
    document.getElementById('pokemons').innerHTML = '';
    let count = 0;
    for (let i = 0; i < pokemonData.length; i++) {
        if (pokemonData[i].name.toUpperCase().includes(searchValue)) {
            count++;
            renderPokemonCard(i);
        }
    }
    showNoEntryMessage(count);
    checkLoadMore(searchValue);
}


// Show nothing found, if nothing match in the array
function showNoEntryMessage(count) {
    if (count == 0) {
        document.getElementById('pokemons').classList.add('center')
        document.getElementById('pokemons').innerHTML = '<div class="no-entry">Nothing found.</span>';
    }else{
        document.getElementById('pokemons').classList.remove('center')
        document.body.removeAttribute('style');
    }
}


// Set the scrolled variable to true, if the length equal zero
function checkLoadMore(searchValue){
    searchValue.length === 0 ? scrollLoad = true : scrollLoad = false;
}


//EventListener
document.addEventListener('keyup', searchPokemon);