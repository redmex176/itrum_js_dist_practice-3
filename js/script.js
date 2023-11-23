document.addEventListener('DOMContentLoaded', () => {
    const btnNext = document.querySelector('.next__pokemon'),
          btnPrev = document.querySelector('.prev__pokemon'),
          imgPokemon = document.querySelector('.img__pokemon'),
          namePokemon = document.querySelector('.name__pokemon'),
          searchInput = document.querySelector('.search'),
          searchBtn = document.querySelector('.search__btn');

    let initialPokemonId = Math.floor(Math.random() * 1001);

        function getPokemon(id) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(data => data.json())
            .then(data => {
                imgPokemon.src = data.sprites.front_default;
                namePokemon.textContent = data.name;
                searchInput.value = '';
            })
            .catch(error => {
                alert("Ошибка");
                searchInput.value = '';
                console.log(error);
            })
    }

    function searchPokemon() {
        const searchName = searchInput.value.toLowerCase();

        fetch(`https://pokeapi.co/api/v2/pokemon/${searchName}`)
            .then(data => data.json())
            .then(data => {
                initialPokemonId = data.id;
                getPokemon(initialPokemonId);
            })
            .catch(error => {
                alert("Такого покемона нет!");
                searchInput.value = '';
                console.log(error);
            })
    }

    function getNextPokemon() {
        initialPokemonId++;
        getPokemon(initialPokemonId);
    }

    function getPrevPokemon() {
        initialPokemonId--;
        getPokemon(initialPokemonId);
    }
    
    searchBtn.addEventListener('click', searchPokemon);
    btnNext.addEventListener('click', getNextPokemon);
    btnPrev.addEventListener('click', getPrevPokemon);

    getPokemon(initialPokemonId);

});