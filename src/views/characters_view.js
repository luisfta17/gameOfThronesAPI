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

  PubSub.subscribe('Characters:character-house-selected-ready', (evt) => {
    this.populate(evt.detail)
  });

  this.dropElement.addEventListener('change', (evt) => {
    const selectedIndex = evt.target.value;
    PubSub.publish('SelectView:change', selectedIndex);
  })

};


CharactersView.prototype.populate = function (characters) {
  this.element.innerHTML= " "
  console.log(characters);
  characters.forEach((character) => {
    const characterName = document.createElement('h4');
    characterName.textContent = character.name;
    this.element.appendChild(characterName);
    if (character.imageLink) {
      const link = character.imageLink;
      const characterImage = document.createElement('img');
      characterImage.src = `https://api.got.show${link}`
      this.element.appendChild(characterImage);
    }
    if(character.titles.length != 0) {
      const titles = document.createElement('p')
      titles.textContent = "Titles "
      this.element.appendChild(titles);
      const titleList = document.createElement("ul");
      for (title of character.titles) {
        const titlename = document.createElement("li");
        titlename.textContent = title;
        titleList.appendChild(titlename);
        this.element.appendChild(titleList);
      }
    }
    if(character.books.length != 0){
      const bookAppeareances = document.createElement('p')
      bookAppeareances.textContent = "Book appearances "
      this.element.appendChild(bookAppeareances);
      const bookList = document.createElement("ul");
      for (bookname of character.books) {
        const book = document.createElement("li");
        book.textContent = bookname;
        bookList.appendChild(book);
        this.element.appendChild(bookList);
      }
    }
  });
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
