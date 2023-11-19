document.addEventListener('DOMContentLoaded', () => {
    const btnNext = document.querySelector('.next__pokemon'),
          btnPrev = document.querySelector('.prev__pokemon'),
          imgPokemon = document.querySelector('.img__pokemon'),
          namePokemon = document.querySelector('.name__pokemon'),
          searchInput = document.querySelector('.search'),
          searchBtn = document.querySelector('.search__btn');

    let idPokemon = 200;
   
        function getPokemon(id) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(data => data.json())
            .then(data => {
                imgPokemon.src = data.sprites.front_default;
                namePokemon.textContent = data.name;
            })
    }

    function searchPokemon() {
        const searchName = searchInput.value.toLowerCase();

        fetch(`https://pokeapi.co/api/v2/pokemon/${searchName}`)
            .then(data => data.json())
            .then(data => {
                idPokemon = data.id;
                getPokemon(idPokemon);
            })
    }

    function getNextPokemon() {
        idPokemon++;
        getPokemon(idPokemon);
    }
    function getPrevPokemon() {
        idPokemon--;
        getPokemon(idPokemon);
    }
    searchBtn.addEventListener('click', searchPokemon);
    btnNext.addEventListener('click', getNextPokemon);
    btnPrev.addEventListener('click', getPrevPokemon);

    getPokemon(idPokemon);

});