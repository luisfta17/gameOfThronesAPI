const PubSub = require('../helpers/pub_sub.js');
const CharacterInfo = require('./character_info.js');

const CharactersView = function (selectElement, dropElement) {
  this.element = selectElement;
  this.dropElement = dropElement;
};

CharactersView.prototype.bindEvents = function () {
  PubSub.subscribe('Characters:characters-houses-ready', (evt) => {
    this.populateListOfHouses(evt.detail)
  });

  PubSub.subscribe('Characters:character-house-selected-ready', (evt) => {
    this.populate(evt.detail)
  });

  this.dropElement.addEventListener('change', (evt) => {
    const selectedIndex = evt.target.value;
    PubSub.publish('SelectView:change', selectedIndex);
  })
};


CharactersView.prototype.populate = function (characters) {
  const character_info = new CharacterInfo();
  character_info.displayInfo(characters, this.element);
};

CharactersView.prototype.populateListOfHouses = function (houses) {
  houses.forEach((house) => {
    const houses = document.createElement('option');
    houses.textContent = house;
    houses.value = house;
    this.dropElement.appendChild(houses);
  });
};





module.exports = CharactersView;
