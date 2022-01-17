let morePokemonData = [];


// Fetch more Pokemon data after clicking Pokemon card
async function loadMoreInfo(id) {
    openPokemonInfo();
    hidePlaceHolder();
    showInfoLoader();
    morePokemonData = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((response) => response.json()),
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`).then((response) => response.json())
    ]);
    renderCurrentPokemonData(id);
}


// Show current Pokemon data in the sidebar
function renderCurrentPokemonData(id) {
    document.getElementById('pokemon-id').innerHTML = '#' + id;
    document.getElementById('pokemon-name').innerHTML = morePokemonData[0].name;
    document.getElementById('pokemon-img').src = morePokemonData[0]['sprites']['other']['official-artwork']['front_default'];
    document.getElementById('pokemon-text').innerHTML = shortenPokedexEntry(150);
    document.getElementById('pokemon-abilities').innerHTML = getAbilities();
    document.getElementById('stats').innerHTML = getStats();
    document.getElementById('pokemon-type').innerHTML = getCurrentType();
    renderHeigtWeight();
    closeInfoLoader();
}


// Get stats from API
function getStats() {
    let text = morePokemonData[0].stats;
    let stats = '';
    let newPokemonStats = ['HP', 'AT', 'DF', 'SA', 'SD', 'SP']
    for (let i = 0; i < text.length; i++) {
        stats += `<div class="pokemon-stats"><span class="stats-title">${newPokemonStats[i]}</span>
        <span class="progress-bar">
            <span style="width:${text[i].base_stat / 2}%" class="progress">${text[i].base_stat}</span>
        </span>
        </div>
        `;
    }
    return stats;
}


// If the Pokedex entry is too long, shorten pokedex entry
function shortenPokedexEntry(limit) {
    let pokedexEntry = morePokemonData[1].flavor_text_entries[2].flavor_text;
    let stringLength = pokedexEntry.length
    let stringDifference = stringLength - limit;
    let finalString = pokedexEntry.substring(0, stringLength - stringDifference);
    return (limit < stringLength) ? finalString : pokedexEntry;
}


// Render Pokemon height and weight and show in the sidebar
function renderHeigtWeight() {
    let pokemonWeight = (morePokemonData[0].weight / 10).toString();
    let pokemonHeight = (morePokemonData[0].height / 10).toString();
    let weightElement = document.getElementById('pokemon-weight');
    let heightElement = document.getElementById('pokemon-height');
    weightElement.innerHTML = `<span class="info-title">Weight:</span><span class="info-text">${pokemonWeight.replace('.', ',')} kg</span>`;
    heightElement.innerHTML = `<span class="info-title">Height:</span><span class="info-text">${pokemonHeight.replace('.', ',')} m</span>`;
}


// Get the current type of Pokemon
function getCurrentType() {
    let types = morePokemonData[0].types;
    let pokeTypes = "";
    document.getElementById('pokemon-type').innerHTML = '';
    let pokemonType = '<span class="info-title">Type:</span>';
    for (let i = 0; i < types.length; i++) {
        pokeTypes += `<span class="${types[i].type.name}">${types[i].type.name}</span>`;
    }
    return pokemonType + pokeTypes;
}


// Get the current abilities of Pokemon 
function getAbilities() {
    let pokemonAbilities = '';
    let abilities = '<span class="info-title">Abilities: </span>';
    for (let i = 0; i < (i < 2 && morePokemonData[0].abilities.length); i++) {
        pokemonAbilities += `<span class="info-text">${morePokemonData[0].abilities[i].ability.name}, </span>`;
    }
    return abilities + pokemonAbilities.slice(0, pokemonAbilities.length - 9);
}