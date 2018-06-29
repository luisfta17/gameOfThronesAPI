const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Characters = function (url) {
  this.url = url;
  this.characters = [];
};

Characters.prototype.getData = function () {
  const request = new RequestHelper(this.url);
  const handleRequestComplete = (responseData) => {
    this.characters = responseData;
    const uniqueHouses = this.getUniqueHouses();
    PubSub.publish('Characters:characters-houses-ready', uniqueHouses);
  };
  request.get()
    .then(handleRequestComplete)
    .catch(error => console.error(error));
}

Characters.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:change', (evt) => {
    const characters = this.getCharacterByHouse(evt.detail);
    PubSub.publish('Characters:character-house-selected-ready', characters);
  });
};

Characters.prototype.getUniqueHouses = function () {
  const allHouses = this.characters.map((character) =>{
    return character.house;
  })
  const uniqueArray = allHouses.filter((value, index, self) => {
    return self.indexOf(value) === index;
  })
  return uniqueArray;
};

Characters.prototype.getCharacterByHouse = function (house) {
  const arrayOfCharacters = [];
  const uniqueArray = this.characters.forEach((character) => {
      if (character.house == house){
        arrayOfCharacters.push(character)
      }
  })
  return arrayOfCharacters;
};





module.exports = Characters;
