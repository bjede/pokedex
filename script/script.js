
let pokemonsData = [];
let pokemonData = [];
let maxLimit = 30;
let startIndex = 0;
let limit = 30;
let offset = 0;
let scrollLoad = true;


// Fetch 30 Pokemon from the API
async function getPokemons() {
    updateLoader();
    for (let i = startIndex; i < maxLimit; i++) {
        pokemonsData = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}/`).then((response) => response.json());
        pushPokemonToArray(i)
    }
    renderPokemon();
}


// Push the current Pokemon to the array
function pushPokemonToArray(i) {
    pokemon = {
        id: i + 1,
        name: pokemonsData.name,
        types: [],
        image: pokemonsData.sprites.other.dream_world.front_default,
        imageBack: pokemonsData.sprites.back_default
    };
    getPokemonType();
    pokemonData.push(pokemon);
}


// Get the current types from the API
function getPokemonType() {
    for (let i = 0; i < pokemonsData.types.length; i++) {
        pokemon.types.push(pokemonsData.types[i].type.name);
    }
}


// Render the current Pokemon
function renderPokemon() {
    for (let i = offset; i < limit; i++) {
        renderPokemonCard(i);
    }
    scrollLoad = true;
    offset = limit;
    updateLoader();
    completeLoader();
}


// Render the Pokemon card
function renderPokemonCard(i) {
    document.getElementById('pokemons').insertAdjacentHTML('beforeend', createHTML(i));
}


// Fetch Pokemon types from API
function getPokemonTypes(index) {
    let types = "";
    for (let i = 0; i < pokemonData[index].types.length; i++) {
        types += `<div class="pokemon__type"><span>${pokemonData[index].types[i]}</span></div>`;
    }
    return types;
}


// Create HTML Template for the Pokemon card
function createHTML(i) {
    let image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonData[i].id}.png`;
    let pokemonCard = `
    <div onclick="loadMoreInfo(${pokemonData[i].id})" class="pokemon__card ${pokemonData[i].types[0]}">
        <div class="pokemon__left">
            <div class="pokemon__name">${pokemonData[i].name}</div>
            ${getPokemonTypes(i)}
        </div>
        <img class="image-back" src="${pokemonData[i].imageBack}">
        <img class="image-front" src="${image}">
        <div class="pokemon__number">#${pokemonData[i].id}</div>
        <div class="pokemon__overlay"></div>
    </div>
    `;
    return pokemonCard;
}


// Sidebar navigation - add or remove the class after clicking the menu link
function sidebarNav(id) {
    let navListItem = document.querySelectorAll('.sidebar__list-item');
    navListItem.forEach((element, index) => {
        (index == id) ? element.classList.add('active') + translatePosition(index, id) : element.classList.remove('active') + translatePosition(index, id);
    });
}


// Translate the container to the right position
function translatePosition(id, i) {
    let navInfo = document.getElementById(`info-${id}`);
    navInfo.style.transform = `translateX(${(id - i) * 100}%)`;
}


// Complete loader and hide loading animation
function completeLoader() {
    closeInfoLoader();
    setTimeout(hidePageLoader, 900);
}


// After finish loading, hide page loader 
function hidePageLoader() {
    let pageLoader = document.getElementById('page-loader');
    (maxLimit === pokemonData.length) ? pageLoader.classList.add('d-none') : pageLoader.classList.remove('d-none')
    document.getElementById('page-loader').classList.add('d-none');
}


// If the length of maxLimit equal pokemonData hide update loader
function updateLoader() {
    let updateLoader = document.getElementById('update-loader');
    (maxLimit === pokemonData.length) ? updateLoader.classList.add('d-none') : updateLoader.classList.remove('d-none')
}

// After clicking a pokemon card hide placeholder
function hidePlaceHolder() {
    showInfoLoader();
    document.getElementById('placeholder').classList.add('d-none');
    document.getElementById('pokemon-info').classList.remove('d-none');
}


// After clicking a pokemon card show info loader
function showInfoLoader() {
    document.getElementById('loader-layer-info').classList.remove('d-none');
}


// Hide Pokemon info loader after loading
function closeInfoLoader() {
    setTimeout(() => {
        document.getElementById('loader-layer-info').classList.add('d-none');
    }, 600);
}


// Calculate the current left position
function calCurrentLeftPosition() {
    let bodyWidth = document.body.clientWidth;
    let containerWidth = document.querySelector('.container').offsetWidth;
    let pokemonsWidth = document.getElementById('pokemons').offsetWidth;
    let leftPosition = ((bodyWidth - containerWidth) / 2) + pokemonsWidth + 10;
    displayCurrentLeftPosition(leftPosition);

}


// Correct the current left position of the sidebar
function displayCurrentLeftPosition(leftPosition) {
    closeInfoCard();
    resetMobileSearchInputValues();
    if (window.innerWidth > 890) {
        correctScrollPosition();
        document.querySelector('.pokemon-info').style.left = `${leftPosition}px`;
        document.body.removeAttribute('style');
    } else {
        document.querySelector('.pokemon-info').removeAttribute('style');
        document.querySelector('.pokemon-info').classList.remove('active-mobile');
    }
}


// Open the sidebar in mobile view
function openPokemonInfo() {
    if (window.innerWidth < 890) {
        document.body.style = 'overflow-y: hidden';
        document.querySelector('.pokemon-info').style = 'position: fixed;';
        document.querySelector('.pokemon-info').classList.add('active-mobile');
        document.querySelector('.pokemon-info').classList.remove('d-none');
    }
}


// Load more Pokémon after scrolling
function loadMorePokemons() {
    if (pokemonData.length < 890) {
        limit += 20, startIndex = maxLimit, maxLimit += 20;
        getPokemons();
    } else {
        showReachedMessage();
    }
}


// Show reached text
function showReachedMessage() {
    document.getElementById('pokemons').insertAdjacentHTML('beforeend', `
        <div class="reached">You have reached the end.</div>
    `);
}


// After scrolling correct the sidebar position
function correctScrollPosition() {
    let sideBar = document.querySelector('.pokemon-info').style;
    let header = document.querySelector('.header').offsetHeight;
    if (window.innerWidth > 890) {
        (window.scrollY > header) ? sideBar.transform = 'translateY(-90px)' : sideBar.transform = 'translateY(0)';
    }
}


// Show button after if reached 150
function showScrollToTopButton() {
    let srollTop = document.getElementById('sroll-top');
    (window.scrollY > 150) ? srollTop.classList.add('active') : srollTop.classList.remove('active');
}

// Jump to the top of window
function scrollToTopPosition() {
    let scrollTop = document.getElementById('sroll-top');
    scrollTop.addEventListener('click', () => window.scrollTo(0, 0));
}


// Close sidebar in mobile version
function closeInfoCard() {
    document.body.removeAttribute('style');
    document.querySelector('.pokemon-info').classList.remove('active-mobile');
}

// Load more Pokémon after scrolling
function infiniteScroll() {
    if (Math.floor(window.innerHeight + window.scrollY - 150) > (document.body.offsetHeight - 1000) && scrollLoad) {
        scrollLoad = false;
        loadMorePokemons();
    }
}


// Change the class and show search input field in mobile version
function toggleMobileSearchInput() {
    let search = document.getElementById('search');
    let getStyle = getComputedStyle(search);
    let getValue = getStyle.getPropertyValue('display');
    (getValue == 'none') ? search.style.display = 'block' : search.style.display = 'none';
    document.getElementById('search-container').classList.toggle('mobile');
}


// Reset search container and search input field after resizing browser window
function resetMobileSearchInputValues() {
    document.getElementById('search').removeAttribute('style');
    document.getElementById('search-container').classList.remove('mobile');
}


// Eventlistener
window.addEventListener('load', scrollToTopPosition);
window.addEventListener('DOMContentLoaded', calCurrentLeftPosition);
window.addEventListener('resize', calCurrentLeftPosition);
window.addEventListener('scroll', correctScrollPosition);
window.addEventListener('scroll', showScrollToTopButton);
window.addEventListener('scroll', infiniteScroll);