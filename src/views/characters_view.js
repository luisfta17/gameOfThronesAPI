const PubSub = require('../helpers/pub_sub.js');

const CharactersView = function (selectElement, dropElement) {
  this.element = selectElement;
  this.dropElement = dropElement;
};

CharactersView.prototype.bindEvents = function () {
  // PubSub.subscribe('Munros:munros-data-ready', (evt) => {
  //   // this.populate(evt.detail)
  // });
  PubSub.subscribe('Characters:characters-houses-ready', (evt) => {
    this.populateListOfHouses(evt.detail)
  });

  // PubSub.subscribe('Munros:munros-region-selected-ready', (evt) => {
  //   this.populate(evt.detail)
  // });
  //
  // this.dropElement.addEventListener('change', (evt) => {
  //   const selectedIndex = evt.target.value;
  //   PubSub.publish('SelectView:change', selectedIndex);
  // })

};

//
// CharactersView.prototype.populate = function (munros) {
//   this.element.innerHTML= " "
//   munros.forEach((munro) => {
//     const munrosName = document.createElement('h2');
//     munrosName.textContent = munro.name;
//     this.element.appendChild(munrosName);
//     const munrosList = document.createElement("ul");
//     const munroHeight = document.createElement("li");
//     const munroRegion = document.createElement("li");
//     const munroMeaning = document.createElement("li");
//     munroHeight.textContent = "Height: " + munro.height;
//     munroMeaning.textContent = "Meaning: " + munro.meaning;
//     munroRegion.textContent = "Region: " + munro.region;
//     munrosList.appendChild(munroMeaning);
//     munrosList.appendChild(munroHeight);
//     munrosList.appendChild(munroRegion);
//     this.element.appendChild(munrosList);
//   });
// };

CharactersView.prototype.populateListOfHouses = function (houses) {
  houses.forEach((house) => {
    const houses = document.createElement('option');
    houses.textContent = house;
    houses.value = house;
    this.dropElement.appendChild(houses);
  });
};





module.exports = CharactersView;
