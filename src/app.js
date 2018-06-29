const Characters = require('./models/characters.js');
const CharactersView = require('./views/characters_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const dropDown = document.querySelector('#houses');
  const characterInfo = document.querySelector('#characters');
  const characters = new Characters('https://api.got.show/api/characters/')
  characters.getData();
  const characterView = new CharactersView(characterInfo, dropDown);
  characterView.bindEvents();
})
