const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Characters = function (url) {
  this.url = url;
  this.characters = [];
};

// Characters.prototype.getData = function () {
//   const request = new RequestHelper(this.url);
//   request.get(data => this.handleData(data));
// };

Characters.prototype.getData = function () {
  const request = new RequestHelper(this.url);
  const handleRequestComplete = (responseData) => {
    this.characters = responseData;
    const uniqueHouses = this.getUniqueHouses();
    // PubSub.publish('Munros:munros-data-ready', this.munros);
    PubSub.publish('Characters:characters-houses-ready', uniqueHouses);
  };
  request.get()
    .then(handleRequestComplete)
    .catch(error => console.error(error));
}

// Characters.prototype.bindEvents = function () {
//   PubSub.subscribe('SelectView:change', (evt) => {
//     const munroes = this.getMunroByRegion(evt.detail);
//     PubSub.publish('Munros:munros-region-selected-ready', munroes);
//   });
// };

// Characters.prototype.handleData = function (data) {
//   this.munros = data;
//   PubSub.publish('Munros:munros-data-ready', this.munros);
// };
//
//
Characters.prototype.getUniqueHouses = function () {
  const allHouses = this.characters.map((character) =>{
    return character.house;
  })
  const uniqueArray = allHouses.filter((value, index, self) => {
    return self.indexOf(value) === index;
  })
  return uniqueArray;
};

// Characters.prototype.getCharacterByHouse = function (region) {
//   const arrayOfMunros = [];
//   const uniqueArray = this.munros.forEach((munro) => {
//       if (munro.region == region){
//         arrayOfMunros.push(munro)
//       }
//   })
//   return arrayOfMunros;
// };





module.exports = Characters;
